const mongoose = require('mongoose')

const textbookSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
    },
    authors: [{
        type: String, 
        require: true,
    }
    ],
    category: {
        type: String,
        required: true,
    }, 
    isSold: {
        type: Boolean, 
        default: false, 
    }, 
    /*
    seller: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }*/ 
})
// production schema
/*
const textbookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    authors: [{
      type: String,
      required: true
    }],
    category: {
      type: String,
      required: true
    },
    condition: {
      type: String,
      enum: ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'],
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    imageUrl: String,
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    listingDate: {
      type: Date,
      default: Date.now
    },
    isSold: {
      type: Boolean,
      default: false
    }
  }, { timestamps: true });
*/

textbookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

const Textbook = mongoose.model('Textbook', textbookSchema)

module.exports = Textbook