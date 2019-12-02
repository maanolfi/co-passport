const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

const app = express()

/* passport basic 
passport.use(require('./src/auth/basic'))
app.get('*', passport.authenticate('basic', {
    session: false
})) */

/* passport local*/
require('./src/auth/local')(passport)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(session({ secret: '%#!%$@%$%$#@%#@',
 resave: false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/view'))


require('./src/index')(app, passport)

mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true })
mongoose.Promise = global.Promise


app.listen(9000, () => {
    console.log('Express esta rodando...')
})


