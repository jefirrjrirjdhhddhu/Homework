const mongoose = require("mongoose")
require('dotenv').config()

    // console.log(process.env.API_LOGINHOMEWORK)
    // return;

    mongoose.set('strictQuery', false);
    const connectmongo = mongoose.createConnection(process.env.API_LOGINHOMEWORK, {
        useNewUrlParser: "true",
        useUnifiedTopology: "true"
    })

    if(connectmongo) {
        console.log('connect loginhomework')
    }
    // .then(() => console.log('connect mongodb login homework'))
    // .catch((err) => console.log(err))

    const maths = new mongoose.Schema({
        username : String,
        password: String
    })

const loginhomework = mongoose.model("users", maths)



module.exports = loginhomework