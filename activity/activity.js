const express = require('express')
const app = express()
const db = require('../db.json')
const infor = require('../information.json')
const cors = require('cors')
const mongoose = require('mongoose')
const homework = require('../homework')
const router = express.Router();
const mainApi = require('../main_api')
const mainControl = require('../mainApi')
const loginhomework = require('../homeworkloginmongo')
const activity = require('./activitySchema')
require('dotenv').config()

const { v4: uuidv4 } = require('uuid');

const ddd = new Date()
const dm = ddd.getMonth() + 1
const dy = ddd.getFullYear()
const dd = ddd.getDate()


const objDate = `${dd}/${dm}/${dy}`

router.post('/', (req, res) => {
    activity.find({}, { List: 1, _id: 0 }).then(data => res.json(data))
})

router.post('/setup', (req, res) => {
    const setup = new activity({
        Id: uuidv4(),
        Date: objDate,
        Status: false
    })

    setup.save().then(r => {
        res.json(r)
    })
})

router.post('/add', (req, res) => {
    activity.updateOne(
        {Date: objDate},
        {$push: {List: {
            date: ddd.getTime(),
            name: req.body.name
        }}}
    ).then(r => {
        res.json({status: "success"})
    })
})

module.exports = router;