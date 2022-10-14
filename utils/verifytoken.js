const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../controllers/contactController');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Invalid token'})
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY)
        req.user = verified;
        next()
    } catch (error) {
        return res.status(403).json({message: 'Invalid token', error})
    }
    
}

module.exports = {
    authenticateToken
}