require('dotenv').config()

const PORT = process.env.PORT || 8000
const URL = (process.env.NODE_ENV === "test") ? process.env.MONGODBTEST_URL : process.env.MONGODB_URL
module.exports = { 
    PORT, 
    URL
}