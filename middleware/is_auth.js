const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
   
    const err = new Error('Not authenticated')
    return res.status(401).send({
        error: err.message,
    });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return res.status(401).send({
      error: err.message,
  });
  }
  if (!decodedToken) {
    const err = new Error('Not authenticated')
    return res.status(401).send({
        error: err.message,
    });
  }
  req.userId = decodedToken.userId;
  next();
};
