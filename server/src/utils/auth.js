/**
 * Simple admin token middleware. Protects sensitive endpoints.
 * Usage: set ADMIN_TOKEN in env and include header `x-admin-token` from client.
 */
const requireAdminToken = (req, res, next) => {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return res.status(500).json({ error: 'Admin token non configurato' });

  const provided = req.headers['x-admin-token'] || req.query.admin_token;
  if (!provided || provided !== expected) {
    return res.status(401).json({ error: 'Non autorizzato' });
  }
  next();
};

module.exports = { requireAdminToken };


