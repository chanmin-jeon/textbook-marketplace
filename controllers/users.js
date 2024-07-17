const User = require('../models/user')
const usersRouter = require('express').Router()
const bycrpt = require('bcrypt') // password hashing 

usersRouter.get('/', async (req, res) => {
    const allUsers = await User.find({})
    res.json(allUsers)
})

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body
    const passwordHash = await bycrpt.hash(password, 10) // hash inputted password

    const user = new User({
        username,
        name, 
        passwordHash
    })

    const savedUser = await user.save()
    console.log(savedUser)
    res.status(201).json(savedUser)
})

module.exports = usersRouter