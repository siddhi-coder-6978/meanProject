const express = require('express')

const app = express()

var bodyparser = require('body-parser')
var jsonparser = bodyparser.json();

const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://siddhi_code:iamamultimillionare@cluster0.ep624sg.mongodb.net/Glammup_signup?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Atlas Connection Established')
}).catch((err) => {
    console.log(err)
})


// mongoDB read data - get API
app.get('/getdata', (req, res) => {
    usermodel.find().then((mdata) => {
        console.log(mdata)
        res.send(mdata)
    }).catch((err) => {
        console.log(err)
    })
})
var usermodel = require('./model/model')

// ADD/ POST DATA API   by body

app.post('/adddata', jsonparser, (req, res) => {
    const userdata = new usermodel({
        _id: new mongoose.Types.ObjectId,
        username: req.body.fname,
        email: req.body.email,
        password: req.body.pawd,
    })
    userdata.save().then((mdata) => {
        console.log(mdata)
    }).catch((err) => {
        console.log(err)
    })
})

//  UPDATE / PUT API DATA BY BODY

app.put('/updatedata/:id', jsonparser, (req, res) => {
    usermodel.updateOne({ _id: req.params.id },
        {
            $set: {
                username: req.body.fname,
                email: req.body.email,
                password: req.body.pawd,
            }
        }).then((mdata) => {
            console.log(mdata)
        }).catch((err) => {
            console.log(err)
            // res.redirect("/getdata")
        })
})

// DELETE DATA by BODY/ DYNAMIC URL 

app.delete('/deletedata/:id', jsonparser, (req, res) => {
    usermodel.deleteOne({ _id: req.params.id }).then((mdata) => {
        res.send(mdata)
        console.log(mdata)
    }).catch((err) => {
        console.log(err)
    })
})


//search by NAME
// app.get('/searchdata/:name', jsonparser, (req, res) => {
//     usermodel.find({ username: req.params.fname }).then((mdata) => {
//         res.send(mdata)
//         console.log(mdata)
//     }).catch((err) => {
//         console.log(err)
//     })
// })

var usermodel = require('./model/model')

app.listen(1000)