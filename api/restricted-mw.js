const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || 'is it secret, is it safe?'
module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if(token){
        jwt.verify(token, jwtSecret, (err, decrypted) => {
            if(err){
                res.status(401).json({message: 'You cannot get in!'})
            } else{
                req.decodedToken = decrypted
                next()
            }
        })
    } else{
        res.status(401).json({message: 'errrrr'})
    }
}