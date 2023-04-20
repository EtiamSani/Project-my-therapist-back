const jwt = require('jsonwebtoken');

const authMiddleware = function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }

  const authHeader = req.headers.authorization;

  if(!authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ error: 'Token is wrong format' });
  }

  const token = authHeader.substring(7, authHeader.length);

 
  jwt.verify(token, 'therapist-secret', (err, user) => {
    if(err) {
      return res.status(403).json({error: "Il faut être authentifié pour accéder à cette ressource"}); 
    }

    req.user = user;
    next();
  });
  
}

module.exports = authMiddleware;