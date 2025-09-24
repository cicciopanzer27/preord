const express = require('express');
const path = require('path');
const fs = require('fs');
const preorderModel = require('../models/preorder');
const { generateCSVFile, convertToCSV, preparePreordersForExport, mapPreorderToSheetRow } = require('../utils/exportUtils');
const { appendRows } = require('../utils/googleSheets');
const { postPreorderToAppsScript } = require('../utils/appsScript');
const { requireAdminToken } = require('../utils/auth');

const router = express.Router();

/**
 * GET /api/export/csv
 * Esporta tutti i preordini in formato CSV
 */
router.get('/csv', requireAdminToken, (req, res) => {
  try {
    const preorders = preorderModel.getAllPreorders();
    
    if (preorders.length === 0) {
      return res.status(404).json({ error: 'Nessun preordine da esportare' });
    }
    
    const csvFilePath = generateCSVFile(preorders);
    
    // Imposta gli header per il download del file
    const fileName = path.basename(csvFilePath);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    
    // Invia il file
    const fileStream = fs.createReadStream(csvFilePath);
    fileStream.pipe(res);
    
    // Elimina il file dopo l'invio
    fileStream.on('end', () => {
      fs.unlinkSync(csvFilePath);
    });
  } catch (error) {
    console.error('Errore nell\'esportazione CSV:', error);
    res.status(500).json({ error: 'Errore nell\'esportazione dei dati in formato CSV' });
  }
});

/**
 * GET /api/export/csv/download
 * Genera e scarica direttamente un file CSV con tutti i preordini
 */
router.get('/csv/download', requireAdminToken, (req, res) => {
  try {
    const preorders = preorderModel.getAllPreorders();
    
    if (preorders.length === 0) {
      return res.status(404).json({ error: 'Nessun preordine da esportare' });
    }
    
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
    
    // Imposta gli header per il download del file
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    
    // Invia il contenuto CSV direttamente
    res.send(csv);
  } catch (error) {
    console.error('Errore nel download CSV:', error);
    res.status(500).json({ error: 'Errore nella generazione del file CSV' });
  }
});

/**
 * GET /api/export/json
 * Esporta tutti i preordini in formato JSON
 */
router.get('/json', requireAdminToken, (req, res) => {
  try {
    const preorders = preorderModel.getAllPreorders();
    
    if (preorders.length === 0) {
      return res.status(404).json({ error: 'Nessun preordine da esportare' });
    }
    
    res.json(preorders);
  } catch (error) {
    console.error('Errore nell\'esportazione JSON:', error);
    res.status(500).json({ error: 'Errore nell\'esportazione dei dati in formato JSON' });
  }
});

/**
 * GET /api/export/stats
 * Ottiene statistiche sui preordini
 */
router.get('/stats', requireAdminToken, (req, res) => {
  try {
    const preorders = preorderModel.getAllPreorders();
    
    if (preorders.length === 0) {
      return res.json({
        totalPreorders: 0,
        totalRevenue: 0,
        productStats: {
          classic: { quantity: 0, revenue: 0 },
          lentisco: { quantity: 0, revenue: 0 },
          mirto: { quantity: 0, revenue: 0 }
        }
      });
    }
    
    // Calcola le statistiche
    const stats = preorders.reduce((acc, preorder) => {
      // Incrementa il conteggio totale
      acc.totalPreorders += 1;
      
      // Aggiungi il totale dell'ordine
      acc.totalRevenue += preorder.total;
      
      // Aggiungi le statistiche per prodotto
      const products = preorder.products;
      
      if (products.classic > 0) {
        acc.productStats.classic.quantity += products.classic;
        acc.productStats.classic.revenue += products.classic * 24.90;
      }
      
      if (products.lentisco > 0) {
        acc.productStats.lentisco.quantity += products.lentisco;
        acc.productStats.lentisco.revenue += products.lentisco * 28.90;
      }
      
      if (products.mirto > 0) {
        acc.productStats.mirto.quantity += products.mirto;
        acc.productStats.mirto.revenue += products.mirto * 28.90;
      }
      
      return acc;
    }, {
      totalPreorders: 0,
      totalRevenue: 0,
      productStats: {
        classic: { quantity: 0, revenue: 0 },
        lentisco: { quantity: 0, revenue: 0 },
        mirto: { quantity: 0, revenue: 0 }
      }
    });
    
    // Arrotonda i valori monetari a 2 decimali
    stats.totalRevenue = parseFloat(stats.totalRevenue.toFixed(2));
    stats.productStats.classic.revenue = parseFloat(stats.productStats.classic.revenue.toFixed(2));
    stats.productStats.lentisco.revenue = parseFloat(stats.productStats.lentisco.revenue.toFixed(2));
    stats.productStats.mirto.revenue = parseFloat(stats.productStats.mirto.revenue.toFixed(2));
    
    res.json(stats);
  } catch (error) {
    console.error('Errore nel calcolo delle statistiche:', error);
    res.status(500).json({ error: 'Errore nel calcolo delle statistiche' });
  }
});

module.exports = router;

/**
 * POST /api/export/google-sheets/sync
 * Sincronizza tutti i preordini sul Google Sheet configurato
 */
router.post('/google-sheets/sync', requireAdminToken, async (req, res) => {
  try {
    const preorders = preorderModel.getAllPreorders();
    if (preorders.length === 0) {
      return res.status(404).json({ error: 'Nessun preordine da sincronizzare' });
    }

    if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      return res.status(400).json({ error: 'Google Sheets non configurato sul server' });
    }

    const range = process.env.GOOGLE_SHEETS_RANGE || 'Preordini!A1';
    const rows = preorders.map(mapPreorderToSheetRow);

    await appendRows(range, rows);

    res.json({ success: true, rowsAppended: rows.length });
  } catch (error) {
    console.error('Errore nella sincronizzazione con Google Sheets:', error);
    res.status(500).json({ error: 'Errore nella sincronizzazione con Google Sheets' });
  }
});

/**
 * POST /api/export/gas/sync
 * Invia tutti i preordini alla Web App di Google Apps Script (se configurata)
 */
router.post('/gas/sync', requireAdminToken, async (req, res) => {
  try {
    const { GAS_WEBAPP_URL, GAS_SHARED_SECRET } = process.env;
    if (!GAS_WEBAPP_URL || !GAS_SHARED_SECRET) {
      return res.status(400).json({ error: 'Apps Script non configurato sul server' });
    }

    const preorders = preorderModel.getAllPreorders();
    if (preorders.length === 0) {
      return res.status(404).json({ error: 'Nessun preordine da sincronizzare' });
    }

    // best-effort: invia in parallelo
    await Promise.all(preorders.map(p => postPreorderToAppsScript(p)));
    res.json({ success: true, rowsAppended: preorders.length });
  } catch (error) {
    console.error('Errore nella sincronizzazione con Apps Script:', error);
    res.status(500).json({ error: 'Errore nella sincronizzazione con Apps Script' });
  }
});
