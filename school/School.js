const express = require('express')
const app = express()
const db = require('../api//db.json')
const infor = require('../api//information.json')
const cors = require('cors')
const mongoose = require('mongoose')
const homework = require('../api//homework')
const router = express.Router();
const mainApi = require('../api//main_api')
const mainControl = require('../api//mainApi')
const loginhomework = require('../api//homeworkloginmongo')
const school = require('./SchoolSchema')
require('dotenv').config()

const { v4: uuidv4 } = require('uuid');



router.get('/', (req, res) => {
    school.find().sort({ createdAt: -1 }).then(r => {
        res.json(r)
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    school.findByIdAndDelete(id).then(r => {
        res.json(r)
    })
})

router.post('/', (req, res) => {
    const text = req.body.text
    const ddd = new Date()
    const dm = ddd.getMonth() + 1
    const dy = ddd.getFullYear()
    const dd = ddd.getDate()

    const objDate = `${dd}/${dm}/${dy}`

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