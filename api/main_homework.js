const mongoose = require("mongoose")
require('dotenv').config()

    // console.log(process.env.API_LOGINHOMEWORK)
    // return;

    mongoose.set('strictQuery', false);
    const connectmongo = mongoose.createConnection(process.env.API, {
        useNewUrlParser: "true",
        useUnifiedTopology: "true"
    })

    if(connectmongo) {
        console.log('connect mainHomework')
    }


    const maths = new mongoose.Schema({
        useradmin: String,
        passwordAdmin: String,
        family: Array,
        homework: Array,
        record: Array,
        gmail: String
    }, {timestamps: true})

const main_homework = mongoose.model("mainHomework", maths)



module.exports = main_homework