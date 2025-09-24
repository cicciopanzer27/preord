const fetch = require('cross-fetch');

/**
 * Posts a preorder to a Google Apps Script Web App endpoint.
 * Controlled via env: GAS_WEBAPP_URL, GAS_SHARED_SECRET
 */
const postPreorderToAppsScript = async (preorder) => {
  const { GAS_WEBAPP_URL, GAS_SHARED_SECRET } = process.env;
  if (!GAS_WEBAPP_URL || !GAS_SHARED_SECRET) return; // not configured

  const payload = { ...preorder, secret: GAS_SHARED_SECRET };

  try {
    await fetch(GAS_WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    // best-effort, non-blocking
  }
};

module.exports = { postPreorderToAppsScript };


