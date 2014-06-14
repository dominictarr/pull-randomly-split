
var bytes = require('crypto').randomBytes(256)
var pull = require('pull-stream')
var tape = require('tape')

var random = require('./')

tape('simple', function (t) {

  pull(
    pull.values([bytes]),
    random(16, 64),
    pull.through(function (e) {
      console.log(e.length)
      t.ok(e.length <  64)
    }),
    pull.collect(function (err, ary) {

      t.equal(Buffer.concat(ary).length, bytes.length)
      t.equal(Buffer.concat(ary).toString('hex'), bytes.toString('hex'))
      t.deepEqual(Buffer.concat(ary).toJSON(), bytes.toJSON())
      t.end()

    })
  )

})


