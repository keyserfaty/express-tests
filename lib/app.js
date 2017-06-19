const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  console.log('Receiving a request to', req.path)
  next()
})

app.get('/', function (req, res) {
  res.sendStatus(200)
})

app.post('/multiply', function (req, res, next) {
  if (!req.body.hasOwnProperty('number')) {
    res.status(404)
    .json({
      status: 404,
      message: 'You should include a `number` field'
    })
    .end()
  } else next()

}, function (req, res, next) {
  res.status(200)
  .json({
    result: req.body.number * 2
  })
})

app.use(function (req, res, next) {
  res.status(404)
  .json({
    status: 404,
    message: "This route doesn't exist"
  })
  .end()
})

app.listen(3000, function () {
  console.log('Listening!')
})
