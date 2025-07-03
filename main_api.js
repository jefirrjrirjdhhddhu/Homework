const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const mainHomework = require('./main_homework')
const { v4: uuidv4 } = require('uuid');
// const EventEmitter = require('events');
// const myEmitter = new EventEmitter();

// myEmitter.on('error', (err) => {
//   console.error('An error occurred:', err);
// });



const ddd = new Date()
const dm = ddd.getMonth() + 1
const dy = ddd.getFullYear()
const dd = ddd.getDate()


const objDate = `${dd}/${dm}/${dy}`

router.post('/user/:id', (req, res) => {
    const id = req.params.id

    mainHomework.findById(id, (err, data) => {
        res.json({
            useradmin: data.useradmin,
            passwordAdmin: data.passwordAdmin,
            family: data.family
        })
    })
})

router.put('/user/:id', (req, res) => {
    const id = req.params.id
    const data = req.body

    mainHomework.updateOne(
        {_id: id},
        {$set: {useradmin: data.username, passwordAdmin: data.password}}
    ).then(r => {
        res.json({
            message: "update success"
        })
    })
})

router.get('/homework/:id', (req, res, next) => {
    try{
        mainHomework.findById(req.params.id, (err, date) => {
            res.json(date.homework)
        })
    }catch(err) {
        console.log(err)
    }
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
        res.json({id: id._id})
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
            }}},
            {$push: {orcord: {
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

router.post('/family/:id', (req, res) => {
    const id = req.params.id

    if(req.body == "" || req.body == null) {
        res.json({
            status: 200,
            message: "not family"
        })
    }

    mainHomework.updateOne(
        {_id: id},
        {$push: {family: {
            id: uuidv4(),
            username: req.body.username,
            password: req.body.password,
            Gmail: req.body.Gmail
        }}}
    ).then(r => {
        res.json({
            status: 200,
            message: "add family success"
        })
    })
})

router.put('/family/:id', (req, res) => {
    const id = req.params.id

    mainHomework.updateOne(
        {_id: id},
        {$set: {family: req.body}}
    ).then((r) => {
        res.status(200).json({
            status: 200,
            message: 'update success'
        })
    })
})

router.delete('/family/:id', (req, res) => {
    const id = req.params.id

    mainHomework.updateOne(
        {_id: id},
        {$pull: {family: {
            id: req.body.id
        }}}
    ).then(r => {
        res.json({
            status: 200,
            message: "delete family success"
        })
    })
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
                        username: username
                    }
                }
            }).then(user=> {
                if(user) {
                    const userfamily = user.family
                    userfamily.forEach(userf => {
                        if(userf.password === password) {
                            return (
                                res.json({
                                    id: user._id,
                                    status: 200,
                                    message: "loginfamily success",
                                    user: "family"
                                })
                            )
                        }else{
                            return (
                                res.json({
                                    message: "password incorrect",
                                    status: "no_password",
                                })
                            )
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