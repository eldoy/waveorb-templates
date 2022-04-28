const db = require('mongowave')

module.exports = function(app) {
  return db(app.config.db)
}
