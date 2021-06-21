var tape = require('tape')
var gulp = require('gulp')
var through = require('through2')
var all = require('./')

tape.test('gulp-all', function(t){

  t.equal(typeof all, 'function')

  var task = all()
  t.ok(task instanceof Promise)

  t.end()
})
