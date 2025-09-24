const { google } = require('googleapis');

/**
 * Creates an authorized Google Sheets client using a service account.
 * Required env vars:
 * - GOOGLE_PROJECT_ID
 * - GOOGLE_CLIENT_EMAIL
 * - GOOGLE_PRIVATE_KEY (escape newlines as \n)
 * - GOOGLE_SHEETS_SPREADSHEET_ID
 */
const getSheetsClient = () => {
  const {
    GOOGLE_PROJECT_ID,
    GOOGLE_CLIENT_EMAIL,
    GOOGLE_PRIVATE_KEY,
    GOOGLE_SHEETS_SPREADSHEET_ID
  } = process.env;

  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEETS_SPREADSHEET_ID) {
    throw new Error('Google Sheets env vars not set');
  }

  const jwt = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    undefined,
    GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    [
      'https://www.googleapis.com/auth/spreadsheets'
    ]
  );

  const sheets = google.sheets({ version: 'v4', auth: jwt });
  return { sheets, spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID };
};

/**
 * Appends rows to a sheet range.
 * @param {string} range A1 notation range, e.g., 'Preordini!A1'
 * @param {Array<Array<string|number>>} values Rows to append
 */
const appendRows = async (range, values) => {
  const { sheets, spreadsheetId } = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values }
  });
};

module.exports = {
  appendRows
};


