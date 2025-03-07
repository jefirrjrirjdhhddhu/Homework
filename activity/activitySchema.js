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

const activity_ = new mongoose.Schema({
    Id: String,
    Date: String,
    List: Array,
    Status: Boolean
})

const activity = mongoose.model("activitys", activity_)


module.exports = activity