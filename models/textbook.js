const mongoose = require('mongoose')

const textbookSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
    },
    authors: [{
        type: String, 
        required: true,
    }],
    category: {
        type: String,
        required: true,
    }, 
    isSold: {
        type: Boolean, 
        default: false, 
    }, 
    price: {
      type: Number, 
      required: true, 
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }, 
    imageFile: {
      type: String, 
    }, 
    listingDate: {
      type: Date,
      default: Date.now
    }
})


textbookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

const Textbook = mongoose.model('Textbook', textbookSchema)

module.exports = Textbook