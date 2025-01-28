const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const mainHomework = require('./main_homework')
const { v4: uuidv4 } = require('uuid');


const ddd = new Date()
const dm = ddd.getMonth() + 1
const dy = ddd.getFullYear()
const dd = ddd.getDate()


const objDate = `${dd}/${dm}/${dy}`

router.get('/homework/:id', (req, res, next) => {
    mainHomework.findById(req.params.id, (err, date) => {
        res.json(date.homework)
    })
})

router.post('/create', async (req, res, next) => {

    // res.json({
    //     message: "success"
    // })

    const main = new mainHomework({
        useradmin: req.body.useradmin,
        passwordAdmin: req.body.passwordAdmin
    })

    await main.save().then((id) => {
        res.json(id._id)
        console.log("create success")
    })
    // mainHomework.create(req.body, (err, data) => {
    //     if (err) return next(err);

    //     res.json(data)
    // })
})

router.post('/homework/:id', (req, res, next) => {
    try{
    const id = uuidv4();
        mainHomework.updateOne(
            {_id: req.params.id},
            {$push: {homework: {
                id: id,
                subject: req.body.subject,
                desc: req.body.desc,
                date: objDate
            }}}
        ).then(() => {
            res.json({
                status: 200,
                message: "success"
            })
        })


    }catch(err) {
        console.log(err)
    }
})

router.delete('/homework/:id/:idHomework', (req, res, next) => {
    try{
        mainHomework.updateOne(
            {_id: req.params.id},
            {$pull: {homework: {id: req.params.idHomework}}}
        ).then(() => {
            res.json({
                status: 200,
                message: "success"
            })
        })



    }catch(err) {
        console.log(err)
    }
})

router.post('/login', (req, res, next) => {

    try{

    const check = (user) => {
        if(user) {
            if(user.passwordAdmin === password) {
                res.json({
                    status: 200,
                    message: "loginAdmin Success",
                    id: user._id,
                    user: "admin"
                })
            }else{
                res.json({
                    status: 500,
                    message: "loginAdmin fail"
                })
            }
        }else {
            mainHomework.findOne({
                family: {
                    $elemMatch: {
                        user: username
                    }
                }
            }).then(user=> {
                if(user) {
                    const userfamily = user.family
                    userfamily.forEach(userf => {
                        if(userf.password === password) {
                            res.json({
                                id: user._id,
                                status: 200,
                                message: "loginfamily success",
                                user: "family"
                            })
                        }else{
                            res.json({
                                message: "password incorrect",
                                status: "no_password",
                            })
                        }
                    })
                }else{
                    res.json({
                        message: "not have user",
                        status: "no_user"
                    })
                }
            })
        }
    }

    const { username, password } = req.body


    mainHomework.findOne({useradmin: username}).then(user => {check(user)})



    }catch(err) {
        console.log(err)
    }
})

module.exports = router;