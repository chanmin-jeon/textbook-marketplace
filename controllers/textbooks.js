const Textbook = require('../models/textbook')
const textbooksRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}

textbooksRouter.get('/', async (req, res) => {
    const allBooks = await Textbook.find({}).populate('seller')
    res.json(allBooks)
})

textbooksRouter.post('/', async (req, res) => {
    const { title, authors, category, price, imageFile } = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({error: 'token invalid'})
    }

    const user = await User.findById(decodedToken.id)

    const textbook = new Textbook({
        title, 
        authors,
        category, 
        price, 
        seller: user.id, 
        imageFile
    })

    const savedTextbook = await textbook.save()
    user.listings = user.listings.concat(savedTextbook._id)
    await user.save()
    res.status(201).json(savedTextbook)
})

textbooksRouter.delete('/:id', async (req, res) => {
    await Textbook.findByIdAndDelete(req.params.id)
    res.status(204).end()
})


module.exports = textbooksRouter