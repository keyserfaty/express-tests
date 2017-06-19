const test = require('tap').test
const nock = require('nock')
const request = require('request')

const host = 'http://localhost:3000'

nock.recorder.rec();

test('should return 200 status', function (t) {
  request.get(host + '/',
    function (err, res, body) {
      t.same(res.statusCode, 200)
      t.end()
    })
})

test('should return a json file with number by two', function (t) {
  request.post({ url: host + '/multiply', form: { number: 3 }},
    function (err, res, body) {

    t.same(res.statusCode, 200)
    t.same(JSON.parse(body).result, 6)
    t.end()
  })
})

test('should return an error', function (t) {
  request.post({ url: host + '/multiply', form: {}},
    function (err, res, body) {

    t.same(res.statusCode, 404)
    t.same(JSON.parse(body).message, 'You should include a `number` field')
    t.end()
  })
})

test('should return an error', function (t) {
  request.get(host + '/other',
    function (err, res, body) {
    t.same(res.statusCode, 404)
    t.same(JSON.parse(body).message, "This route doesn't exist")
    t.end()
  })
})
