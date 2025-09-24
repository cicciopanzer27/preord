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
- `POST /api/export/google-sheets/sync` - Sincronizza tutti i preordini sul Google Sheet
- `POST /api/export/gas/sync` - Invia tutti i preordini alla Web App Apps Script

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

## Configurazione Google Sheets
## Sicurezza

- Imposta un token admin nel backend:

```env
ADMIN_TOKEN=metti-un-token-lungo-qui
```

- Gli endpoint sensibili (`/api/export/*`) richiedono l'header `x-admin-token` o la query `?admin_token=...`.
- Frontend admin: imposta in `.env` del frontend `VITE_ADMIN_TOKEN` per consentire export/download.

### Git Hygiene
- `server/.env` e `server/data/` sono ignorati da Git. Non committare segreti o dati.

Per abilitare l'integrazione con Google Sheets, crea un account di servizio su Google Cloud, scarica le credenziali e condividi il foglio di calcolo con l'email dell'account di servizio.

Variabili richieste nel file `.env` nella cartella `server/`:

```env
# Google Sheets (Service Account)
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_CLIENT_EMAIL=service-account@your-project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
# Opzionale: range con intestazioni esistenti
GOOGLE_SHEETS_RANGE=Preordini!A1
```

Mappatura colonne utilizzata:

- "Nome e Cognome"
- "Email"
- "Telefono"
- "Indirizzo di Consegna"
- "Note Aggiuntive"
- "Extra Vergine di Oliva Classico - 250ml"
- "Aromatizzato al Lentisco Speciale - 250ml"
- "Aromatizzato al Mirto Speciale - 250ml"
