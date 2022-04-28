// Set up dugg for upload to Amazon S3
const dugg = require('dugg')

module.exports = function(app) {
  return dugg(app.config.upload)
}
