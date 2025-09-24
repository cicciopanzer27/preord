# NURA Landing Page - Backend

Backend per la landing page NURA con sistema di preordini esportabile in CSV/Excel.

## Funzionalità

- API RESTful per la gestione dei preordini
- Validazione dei dati con Zod
- Esportazione dei dati in formato CSV/Excel
- Statistiche sui preordini

## Requisiti

- Node.js 14.x o superiore
- npm o pnpm

## Installazione

```bash
cd server
npm install
# oppure
pnpm install
```

## Avvio del server

```bash
# Modalità sviluppo con hot reload
npm run dev
# oppure
pnpm run dev

# Modalità produzione
npm start
# oppure
pnpm start
```

Il server sarà disponibile all'indirizzo `http://localhost:5000`.

## Struttura del progetto

```
server/
├── data/               # Directory per i dati persistenti
│   └── preorders.json  # File JSON con i preordini
├── src/
│   ├── models/         # Modelli per l'accesso ai dati
│   ├── routes/         # Rotte API
│   ├── utils/          # Utility per l'esportazione dati
│   └── index.js        # Entry point dell'applicazione
├── .env                # Variabili d'ambiente
└── package.json        # Dipendenze e script
```

## API Endpoints

### Preordini

- `GET /api/preorders` - Ottiene tutti i preordini
- `GET /api/preorders/:id` - Ottiene un preordine specifico
- `POST /api/preorders` - Crea un nuovo preordine
- `PUT /api/preorders/:id` - Aggiorna un preordine esistente
- `DELETE /api/preorders/:id` - Elimina un preordine

### Esportazione

- `GET /api/export/csv` - Esporta tutti i preordini in formato CSV
- `GET /api/export/csv/download` - Scarica direttamente un file CSV con tutti i preordini
- `GET /api/export/json` - Esporta tutti i preordini in formato JSON
- `GET /api/export/stats` - Ottiene statistiche sui preordini

## Formato dei dati

### Preordine

```json
{
  "name": "Mario Rossi",
  "email": "mario.rossi@example.com",
  "phone": "3471234567",
  "address": "Via Roma 123, Milano",
  "products": {
    "classic": 2,
    "lentisco": 1,
    "mirto": 0
  },
  "notes": "Consegna nel pomeriggio"
}
```

## Note

- I dati vengono salvati localmente nel file `data/preorders.json`
- Per un ambiente di produzione, si consiglia di utilizzare un database come MongoDB o PostgreSQL
