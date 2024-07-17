const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, ()=>{
    console.log('starting from port', config.PORT)
})