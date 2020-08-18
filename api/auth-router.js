const express = require('express')
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')

const Users = require('./user-helpers')
const jwtSecret = process.env.JWT_SECRET || 'is it secret, is it safe?'
const router = express.Router()
router.post('/register', (req, res) => {
    const credentials = req.body
    const {username, password} = credentials
    if(username && password){

        const rounds = 12
        const hash = bcryptjs.hashSync(password, rounds)
        credentials.password = hash

        Users.add(credentials)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
    } else {
        res.status(400).json({
            message: "please enter valid credentials"
        })
    }
})

router.post('/login', (req, res) => {
    const {username, password} = req.body
    if(username && password){
        Users.findBy({username: username})
            .then(([user]) =>{
                if(bcryptjs.compareSync(password, user.password)){
                    const token = signToken(user)

                    res.status(200).json({user, token, message: 'You are signed in!'})
                }else{
                    res.status(401).json({message: 'invalid credentials'})
                }
            })
    } else{
        res.status(400).json({ message: 'please enter correct username/password'})
    }
})

function signToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role
    }

    const secret = jwtSecret

    const options = {
        expiresIn: '2d'
    }

    return jwt.sign(payload, secret, options)
}
module.exports = router
