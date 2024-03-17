'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./build/cmj.min.js');
} else {
  module.exports = require('./src/index.js');
}