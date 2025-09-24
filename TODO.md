# TODO - NURA Landing Page Project (4 mesi)

## Panoramica del Progetto
Obiettivo: Creare una landing page per la raccolta di preordini per oli d'oliva, con integrazione Google Sheets per la gestione dei dati.

**Stato Attuale (Settembre 2025):**
- ✅ Frontend React/Vite completato con componenti UI
- ✅ Form di preordine implementato (nome, email, prodotti)
- ✅ Backend Node.js/Express per gestione preordini
- ✅ Salvataggio dati in JSON locale
- ✅ Sistema di esportazione CSV
- 🔄 **DA COMPLETARE:** Integrazione Google Sheets
- 🔄 **DA COMPLETARE:** Testing completo frontend/backend
- 🔄 **DA COMPLETARE:** Preparazione deployment

## Mese 1: Finalizzazione Core Features (Ottobre 2025)

### Settimana 1-2: Completamento Frontend
- [ ] Verificare tutte le sezioni della landing page (Hero, Why, How, Footer)
- [ ] Testare responsive design su dispositivi mobili
- [ ] Ottimizzare performance caricamento immagini
- [ ] Implementare analytics (Google Analytics)
- [ ] Aggiungere meta tags SEO e Open Graph

### Settimana 3-4: Backend Base e Sicurezza
- [ ] Implementare validazione avanzata email
- [ ] Aggiungere sistema di conferma email
- [ ] Implementare logging strutturato
- [ ] Aggiungere middleware per sanitizzazione input
- [ ] Creare sistema di backup automatico dati JSON

## Mese 2: Integrazione Google Sheets (Novembre 2025)

### Settimana 1-2: Setup Google API
- [ ] Creare progetto Google Cloud Console
- [ ] Abilitare Google Sheets API
- [ ] Generare service account credentials
- [ ] Configurare variabili ambiente (.env)
- [ ] Creare foglio Google Sheets per preordini

### Settimana 3-4: Implementazione Integrazione
- [ ] Installare googleapis package
- [ ] Creare utilità per connessione Google Sheets
- [ ] Modificare modello preorder per salvare su Sheets
- [ ] Implementare sincronizzazione bidirezionale (JSON ↔ Sheets)
- [ ] Gestire errori connessione API Google
- [ ] Aggiungere retry logic per chiamate API

## Mese 3: Testing e Ottimizzazioni (Dicembre 2025)

### Settimana 1-2: Testing Funzionale
- [ ] Test end-to-end form submission
- [ ] Verificare salvataggio su Google Sheets
- [ ] Test validazione form lato client/server
- [ ] Test esportazione CSV da admin panel
- [ ] Test responsive su diversi browser

### Settimana 3-4: Ottimizzazioni e Sicurezza
- [ ] Implementare rate limiting avanzato
- [ ] Aggiungere CAPTCHA per prevenire spam
- [ ] Ottimizzare performance database
- [ ] Implementare caching per dati statici
- [ ] Aggiungere monitoraggio errori (Sentry)

## Mese 4: Deployment e Lancio (Gennaio 2026)

### Settimana 1-2: Preparazione Deployment
- [ ] Scegliere provider hosting (Vercel/Netlify per frontend, Railway/Render per backend)
- [ ] Configurare CI/CD pipeline
- [ ] Preparare dominio e SSL
- [ ] Configurare variabili ambiente produzione
- [ ] Test deployment staging

### Settimana 3-4: Lancio e Monitoraggio
- [ ] Deploy in produzione
- [ ] Test finale end-to-end
- [ ] Implementare monitoraggio uptime
- [ ] Creare dashboard admin per monitoraggio
- [ ] Pianificare manutenzione post-lancio

## Milestone Critiche
- **Fine Mese 1:** Landing page completamente funzionale localmente
- **Fine Mese 2:** Dati salvati sia JSON che Google Sheets
- **Fine Mese 3:** Testing completo superato
- **Fine Mese 4:** Sito live e monitorato

## Rischi e Contingency
- **Rischio:** Problemi con Google API limits → Soluzione: Implementare fallback su JSON
- **Rischio:** Cambiamenti Google API → Soluzione: Monitorare documentazione ufficiale
- **Rischio:** Problemi performance → Soluzione: Ottimizzazioni progressive

## Metriche di Successo
- Tempo di caricamento < 3 secondi
- Form submission rate > 95%
- Zero downtime post-deployment
- Integrazione Google Sheets funzionante al 100%

## Budget e Risorse
- Hosting: ~$20/mese (Vercel + Railway)
- Google Cloud: Free tier sufficiente
- Dominio: ~$15/anno
- Analytics: Google Analytics (free)