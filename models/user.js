const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true, 
        minLength: 5
    }, 
    name: String, 
    passwordHash: String, 
    listings: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Textbook'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id,
        delete returnedObject.__v,
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User