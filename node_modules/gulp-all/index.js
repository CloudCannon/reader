'use strict'

var exhaust = require('stream-exhaust')

module.exports = function () {
  var args = Array.isArray(arguments[0])
    ? arguments[0]
    : [].slice.call(arguments)

  var tasks = args.map(function (task) {
    if(task instanceof Promise)
      return task;
    
    return new Promise(function (res, rej) {
      exhaust(task)
        .on('finish', res)
        .on('error', rej)
    })
  })

  return Promise.all(tasks)
}
