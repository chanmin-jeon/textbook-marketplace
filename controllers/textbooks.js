const Textbook = require('../models/textbook')
const textbooksRouter = require('express').Router()

textbooksRouter.get('/', async (req, res) => {
    const allBooks = await Textbook.find({})
    res.json(allBooks)
})

textbooksRouter.post('/', async (req, res) => {
    const { title, authors, category } = req.body

    const textbook = new Textbook({
        title, 
        authors,
        category, 
    })

    const savedTextbook = await textbook.save()
    res.status(201).json(savedTextbook)
})

module.exports = textbooksRouter