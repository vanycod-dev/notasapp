const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return res.status(401).json({ msg: 'Acceso denegado' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token no válido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Asegúrate de que el payload del token contiene `id`
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};
