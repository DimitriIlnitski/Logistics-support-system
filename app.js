const express = require('express')
const mongoose = require('mongoose')
const expressHbs = require('express-handlebars')
const hbs = require('hbs')
const app = express()

app.use(express.static('public'))

const productRouter = require('./routes/productRouter.js')

app.set('view engine', 'hbs')
app.set('view options', { layout: 'layouts/layout' })
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.urlencoded({ extended: false }))

app.use('/products', productRouter)
app.use('/', productRouter)

app.use(function (request, response, next) {
  response.status(404).send('Not found')
})

mongoose.connect(
  'mongodb://localhost:27017/usersdb',
  { useUnifiedTopology: true },
  function (err) {
    if (err) return console.log(err)
    app.listen(3000, function () {
      console.log('Server awaits for connection at http://localhost:3000')
    })
  }
)
