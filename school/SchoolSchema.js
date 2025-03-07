const mongoose = require("mongoose")
require('dotenv').config()

 mongoose.set('strictQuery', false);
    const connectmongo = mongoose.createConnection(process.env.API, {
        useNewUrlParser: "true",
        useUnifiedTopology: "true"
    })

    if(connectmongo) {
        console.log('connect activity')
    }

const school1 = new mongoose.Schema({
    Date: String,
    Text: String
})

const school = mongoose.model("schools", school1)


module.exports = school