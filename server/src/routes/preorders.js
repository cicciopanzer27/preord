const express = require('express');
const { z } = require('zod');
const preorderModel = require('../models/preorder');
const { appendPreorderToGoogleSheet } = require('../utils/exportUtils');

const router = express.Router();

// Schema di validazione per i prodotti nel preordine
const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  quantity: z.number().int().min(0),
  price: z.number().optional()
});

// Schema di validazione per il preordine
const PreorderSchema = z.object({
  name: z.string().min(1, { message: 'Il nome è obbligatorio' }),
  email: z.string().email({ message: 'Email non valida' }),
  phone: z.string().optional(),
  address: z.string().optional(),
  products: z.object({
    classic: z.number().int().min(0),
    lentisco: z.number().int().min(0),
    mirto: z.number().int().min(0)
  }),
  notes: z.string().optional()
}).refine(data => {
  // Almeno un prodotto deve essere selezionato
  return data.products.classic > 0 || data.products.lentisco > 0 || data.products.mirto > 0;
}, {
  message: 'Seleziona almeno un prodotto',
  path: ['products']
});

/**
 * GET /api/preorders
 * Ottiene tutti i preordini
 */
router.get('/', (req, res) => {
  try {
    const preorders = preorderModel.getAllPreorders();
    res.json(preorders);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei preordini' });
  }
});

/**
 * GET /api/preorders/:id
 * Ottiene un preordine specifico tramite ID
 */
router.get('/:id', (req, res) => {
  try {
    const preorder = preorderModel.getPreorderById(req.params.id);
    
    if (!preorder) {
      return res.status(404).json({ error: 'Preordine non trovato' });
    }
    
    res.json(preorder);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero del preordine' });
  }
});

/**
 * POST /api/preorders
 * Crea un nuovo preordine
 */
router.post('/', (req, res) => {
  try {
    // Validazione dei dati in ingresso
    const validationResult = PreorderSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Dati non validi',
        details: validationResult.error.format()
      });
    }
    
    // Calcolo del totale
    const prices = {
      classic: 24.90,
      lentisco: 28.90,
      mirto: 28.90
    };
    
    const products = validationResult.data.products;
    const total = Object.keys(products).reduce((sum, key) => {
      return sum + (products[key] * prices[key]);
    }, 0);
    
    // Creazione del preordine con totale calcolato
    const preorderData = {
      ...validationResult.data,
      total: parseFloat(total.toFixed(2)),
      status: 'pending' // pending, confirmed, cancelled
    };
    
    const savedPreorder = preorderModel.savePreorder(preorderData);
    
    // Append to Google Sheet if configured (non-blocking)
    appendPreorderToGoogleSheet(savedPreorder).catch(() => {});

    res.status(201).json(savedPreorder);
  } catch (error) {
    console.error('Errore nella creazione del preordine:', error);
    res.status(500).json({ error: 'Errore nella creazione del preordine' });
  }
});

/**
 * PUT /api/preorders/:id
 * Aggiorna un preordine esistente
 */
router.put('/:id', (req, res) => {
  try {
    const preorderId = req.params.id;
    
    // Verifica che il preordine esista
    const existingPreorder = preorderModel.getPreorderById(preorderId);
    if (!existingPreorder) {
      return res.status(404).json({ error: 'Preordine non trovato' });
    }
    
    // Validazione dei dati in ingresso
    const validationResult = PreorderSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Dati non validi',
        details: validationResult.error.format()
      });
    }
    
    // Calcolo del totale
    const prices = {
      classic: 24.90,
      lentisco: 28.90,
      mirto: 28.90
    };
    
    const products = validationResult.data.products;
    const total = Object.keys(products).reduce((sum, key) => {
      return sum + (products[key] * prices[key]);
    }, 0);
    
    // Aggiornamento del preordine con totale calcolato
    const preorderData = {
      ...validationResult.data,
      total: parseFloat(total.toFixed(2))
    };
    
    const updatedPreorder = preorderModel.updatePreorder(preorderId, preorderData);
    
    res.json(updatedPreorder);
  } catch (error) {
    console.error('Errore nell\'aggiornamento del preordine:', error);
    res.status(500).json({ error: 'Errore nell\'aggiornamento del preordine' });
  }
});

/**
 * DELETE /api/preorders/:id
 * Elimina un preordine
 */
router.delete('/:id', (req, res) => {
  try {
    const preorderId = req.params.id;
    
    const success = preorderModel.deletePreorder(preorderId);
    
    if (!success) {
      return res.status(404).json({ error: 'Preordine non trovato' });
    }
    
    res.status(204).end();
  } catch (error) {
    console.error('Errore nell\'eliminazione del preordine:', error);
    res.status(500).json({ error: 'Errore nell\'eliminazione del preordine' });
  }
});

module.exports = router;
