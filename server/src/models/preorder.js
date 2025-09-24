const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataFile = path.join(__dirname, '../../data/preorders.json');

/**
 * Legge tutti i preordini dal file JSON
 * @returns {Array} Array di preordini
 */
const getAllPreorders = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data).preorders;
  } catch (error) {
    console.error('Errore nella lettura dei preordini:', error);
    return [];
  }
};

/**
 * Salva un nuovo preordine
 * @param {Object} preorderData Dati del preordine
 * @returns {Object} Preordine salvato con ID generato
 */
const savePreorder = (preorderData) => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    const { preorders } = JSON.parse(data);
    
    const newPreorder = {
      id: uuidv4(),
      ...preorderData,
      createdAt: new Date().toISOString()
    };
    
    preorders.push(newPreorder);
    
    fs.writeFileSync(dataFile, JSON.stringify({ preorders }, null, 2));
    
    return newPreorder;
  } catch (error) {
    console.error('Errore nel salvataggio del preordine:', error);
    throw new Error('Impossibile salvare il preordine');
  }
};

/**
 * Ottiene un preordine specifico tramite ID
 * @param {string} id ID del preordine
 * @returns {Object|null} Preordine trovato o null
 */
const getPreorderById = (id) => {
  try {
    const preorders = getAllPreorders();
    return preorders.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Errore nel recupero del preordine:', error);
    return null;
  }
};

/**
 * Elimina un preordine tramite ID
 * @param {string} id ID del preordine da eliminare
 * @returns {boolean} True se eliminato con successo, false altrimenti
 */
const deletePreorder = (id) => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    const { preorders } = JSON.parse(data);
    
    const initialLength = preorders.length;
    const filteredPreorders = preorders.filter(p => p.id !== id);
    
    if (filteredPreorders.length === initialLength) {
      return false; // Nessun preordine è stato eliminato
    }
    
    fs.writeFileSync(dataFile, JSON.stringify({ preorders: filteredPreorders }, null, 2));
    return true;
  } catch (error) {
    console.error('Errore nell\'eliminazione del preordine:', error);
    return false;
  }
};

/**
 * Aggiorna un preordine esistente
 * @param {string} id ID del preordine da aggiornare
 * @param {Object} updateData Dati da aggiornare
 * @returns {Object|null} Preordine aggiornato o null se non trovato
 */
const updatePreorder = (id, updateData) => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    const { preorders } = JSON.parse(data);
    
    const index = preorders.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    const updatedPreorder = {
      ...preorders[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    preorders[index] = updatedPreorder;
    
    fs.writeFileSync(dataFile, JSON.stringify({ preorders }, null, 2));
    
    return updatedPreorder;
  } catch (error) {
    console.error('Errore nell\'aggiornamento del preordine:', error);
    return null;
  }
};

module.exports = {
  getAllPreorders,
  savePreorder,
  getPreorderById,
  deletePreorder,
  updatePreorder
};
