const mongoose = require("mongoose")
require('dotenv').config()

 mongoose.set('strictQuery', false);
    const connectmongo = mongoose.createConnection(process.env.API, {
        useNewUrlParser: "true",
        useUnifiedTopology: "true"
    })

    if(connectmongo) {
        console.log('connect Control')
    }

const control = new mongoose.Schema({
    com: Boolean,
    admin: String,
    chrome: Boolean,
    shutdown: Boolean,
    vsCode: Boolean,
    restart: Boolean
})

const mainSchema = mongoose.model("control", control)


module.exports = mainSchema