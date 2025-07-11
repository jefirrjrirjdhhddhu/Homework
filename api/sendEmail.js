const nodemiler = require("nodemailer")
const data = require('./data.json')
require('dotenv').config()

const env = process.env

async function sendEmail(res) {
    if(res.name == '') {return;}
        var transporter = nodemiler.createTransport({
        service: 'gmail',
        auth: {
            user: env.Gmail_User,
            pass: env.Gmail_Password
        },
    })

    const html = `หวัดดี <b style="color: red;">${res.name}</b> ข้อความนี้เป็นการเทสระบบเฉยๆ ไม่มีกลอนเหมือนอนุจิตร แต่ถ้าไว้ใจกัน <b style="color: green;">โปรดกดปุ่มนี้หน่อย</b> อิอิ 
                    <br>
                    <br>
                    <br>
                    <br>
                    <a href="https://homework-relax.vercel.app/qrcode/${res.name}/${res.email}" style="padding: 0.5rem 1rem; background: red; color: #fff; margin-left: 10px; font-size: 15px; border-radius: 5px; margin-Top: 90px; text-decoration: none;">click me !!!!</a>`

    var mailoption = {
        from: 'HomeworkRelax',
        to: res.email,
        subject: 'Test Code...',
        html: html
    }

    transporter.sendMail(mailoption, (err, info) => {
        if(err) {
            console.log(err)
        }else{
            console.log(info)
        }
    })
}

async function startCode() {
    for(const e of data) {
        await sendEmail(e)
    }

    console.log('success ✅✅')
}

startCode()

// var transporter = nodemiler.createTransport({
//     service: 'gmail',
//     auth: {
//         user: env.Gmail_User,
//         pass: env.Gmail_Password
//     },
// })

// const html = `หวัดดี <b style="color: red;">ภูมิ4/1</b> ข้อความนี้เป็นการเทสระบบเฉยๆ ไม่มีกลอนเหมือนอนุจิตร แต่ถ้าไว้ใจกัน <b style="color: green;">โปรดกดปุ่มนี้หน่อย</b> อิอิ 
//                 <br>
//                 <br>
//                 <br>
//                 <br>
//                 <a href="https://homework-relax.vercel.app/qrcode/poom/12" style="padding: 0.5rem 1rem; background: red; color: #fff; margin-left: 10px; font-size: 15px; border-radius: 5px; margin-Top: 90px; text-decoration: none;">click me !!!!</a>`

// var mailoption = {
//     from: 'HomeworkRelax',
//     to: 'poomnnn2341@gmail.com',
//     subject: 'Test Code...',
//     html: html
// }

// transporter.sendMail(mailoption, (err, info) => {
//     if(err) {
//         console.log(err)
//     }else{
//         console.log(info)
//     }
// })