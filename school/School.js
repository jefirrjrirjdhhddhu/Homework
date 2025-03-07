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
const school = require('./SchoolSchema')
require('dotenv').config()

const { v4: uuidv4 } = require('uuid');

const ddd = new Date()
const dm = ddd.getMonth() + 1
const dy = ddd.getFullYear()
const dd = ddd.getDate()

const objDate = `${dd}/${dm}/${dy}`

router.get('/', (req, res) => {
    school.find().sort({ createdAt: -1 }).then(r => {
        res.json(r)
    })
})

router.post('/', (req, res) => {
    const text = req.body.text

    const data = new school({
        Date: objDate,
        Text: text
    })

    data.save().then(r=> {
        res.json({
            message: "add success"
        })
    })
})

module.exports = router;