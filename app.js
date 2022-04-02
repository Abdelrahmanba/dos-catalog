var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var catalogRouter = require('./routes/catalog')
var app = express()
require('./db/db.js')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(catalogRouter)

module.exports = app
