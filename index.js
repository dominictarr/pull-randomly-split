
//I suspect that this could be generalized to a reduce/unreduc
//ball/bite (roll into ball, take a bite)

module.exports = function (min, max) {
  min = min || 1
  max = max || Infinity
  var buffer = new Buffer(0), ended
  function bite () {
    var offset = min + ~~(Math.random() * Math.min(max - min, buffer.length))
    data = buffer.slice(0, offset)
    buffer = buffer.slice(offset)
    return data
  }

  return function (read) {
    return function (abort, cb) {
      if(abort) return read(abort, cb)
      if(ended) {
        if(buffer.length) cb(null, bite())
        else              cb(ended)
        return
      }
      read(null, function (end, data) {
        if(end) {
          ended = end
          if(buffer.length)
            return cb(null, bite())
          return cb(ended)
        }
        //copy twice, this isn't efficient,
        //but this is just for testing.
        if(buffer)
          buffer = Buffer.concat([buffer, data])
        else
          buffer = data

        cb(null, bite())
      })
    }
  }
}

