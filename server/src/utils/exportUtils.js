const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const { appendRows } = require('./googleSheets');

/**
 * Converte un array di oggetti in formato CSV
 * @param {Array} data Array di oggetti da convertire
 * @param {Array} fields Campi da includere nel CSV
 * @returns {String} Stringa in formato CSV
 */
const convertToCSV = (data, fields) => {
  try {
    const opts = { fields };
    const parser = new Parser(opts);
    return parser.parse(data);
  } catch (error) {
    console.error('Errore nella conversione in CSV:', error);
    throw new Error('Impossibile convertire i dati in formato CSV');
  }
};

/**
 * Prepara i dati dei preordini per l'esportazione
 * @param {Array} preorders Array di preordini
 * @returns {Array} Dati formattati per l'esportazione
 */
const preparePreordersForExport = (preorders) => {
  return preorders.map(preorder => {
    // Estrai i prodotti e le quantità
    const classicQty = preorder.products.classic || 0;
    const lentiscoQty = preorder.products.lentisco || 0;
    const mirtoQty = preorder.products.mirto || 0;
    
    // Calcola il totale per ogni prodotto
    const classicTotal = classicQty * 24.90;
    const lentiscoTotal = lentiscoQty * 28.90;
    const mirtoTotal = mirtoQty * 28.90;
    
    return {
      ID: preorder.id,
      Nome: preorder.name,
      Email: preorder.email,
      Telefono: preorder.phone || '',
      Indirizzo: preorder.address || '',
      'Olio Classico (Quantità)': classicQty,
      'Olio Classico (Totale €)': classicQty > 0 ? classicTotal.toFixed(2) : '',
      'Olio Lentisco (Quantità)': lentiscoQty,
      'Olio Lentisco (Totale €)': lentiscoQty > 0 ? lentiscoTotal.toFixed(2) : '',
      'Olio Mirto (Quantità)': mirtoQty,
      'Olio Mirto (Totale €)': mirtoQty > 0 ? mirtoTotal.toFixed(2) : '',
      'Totale Ordine (€)': preorder.total.toFixed(2),
      'Stato': preorder.status,
      'Note': preorder.notes || '',
      'Data Creazione': new Date(preorder.createdAt).toLocaleString('it-IT'),
      'Data Aggiornamento': preorder.updatedAt ? new Date(preorder.updatedAt).toLocaleString('it-IT') : ''
    };
  });
};

/**
 * Genera un file CSV dai preordini e lo salva nella directory data
 * @param {Array} preorders Array di preordini
 * @returns {String} Percorso del file CSV generato
 */
const generateCSVFile = (preorders) => {
  try {
    const formattedData = preparePreordersForExport(preorders);
    
    const fields = [
      { label: 'ID', value: 'ID' },
      { label: 'Nome', value: 'Nome' },
      { label: 'Email', value: 'Email' },
      { label: 'Telefono', value: 'Telefono' },
      { label: 'Indirizzo', value: 'Indirizzo' },
      { label: 'Olio Classico (Quantità)', value: 'Olio Classico (Quantità)' },
      { label: 'Olio Classico (Totale €)', value: 'Olio Classico (Totale €)' },
      { label: 'Olio Lentisco (Quantità)', value: 'Olio Lentisco (Quantità)' },
      { label: 'Olio Lentisco (Totale €)', value: 'Olio Lentisco (Totale €)' },
      { label: 'Olio Mirto (Quantità)', value: 'Olio Mirto (Quantità)' },
      { label: 'Olio Mirto (Totale €)', value: 'Olio Mirto (Totale €)' },
      { label: 'Totale Ordine (€)', value: 'Totale Ordine (€)' },
      { label: 'Stato', value: 'Stato' },
      { label: 'Note', value: 'Note' },
      { label: 'Data Creazione', value: 'Data Creazione' },
      { label: 'Data Aggiornamento', value: 'Data Aggiornamento' }
    ];
    
    const csv = convertToCSV(formattedData, fields);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `preordini-nura-${timestamp}.csv`;
    const filePath = path.join(__dirname, '../../data', fileName);
    
    fs.writeFileSync(filePath, csv);
    
    return filePath;
  } catch (error) {
    console.error('Errore nella generazione del file CSV:', error);
    throw new Error('Impossibile generare il file CSV');
  }
};

module.exports = {
  convertToCSV,
  preparePreordersForExport,
  generateCSVFile
};

/**
 * Maps a single preorder to a Google Sheet row following client's column layout.
 * Columns: Nome e Cognome, Email, Telefono, Indirizzo di Consegna, Note Aggiuntive,
 * "Extra Vergine di Oliva Classico - 250ml", Aromatizzato al Lentisco Speciale - 250ml,
 * Aromatizzato al Mirto Speciale - 250ml
 */
const mapPreorderToSheetRow = (preorder) => {
  return [
    preorder.name || '',
    preorder.email || '',
    preorder.phone || '',
    preorder.address || '',
    preorder.notes || '',
    preorder.products?.classic ?? 0,
    preorder.products?.lentisco ?? 0,
    preorder.products?.mirto ?? 0
  ];
};

/**
 * Appends a preorder row to Google Sheet if GOOGLE_SHEETS_SPREADSHEET_ID is configured.
 * Range defaults to 'Preordini!A1'.
 */
const appendPreorderToGoogleSheet = async (preorder, range = process.env.GOOGLE_SHEETS_RANGE || 'Preordini!A1') => {
  if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) return; // silently skip if not configured
  const row = mapPreorderToSheetRow(preorder);
  await appendRows(range, [row]);
};

module.exports.mapPreorderToSheetRow = mapPreorderToSheetRow;
module.exports.appendPreorderToGoogleSheet = appendPreorderToGoogleSheet;
