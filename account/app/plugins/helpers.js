const helpers = {}

helpers.getColor = function() {
  var h = Math.floor(360 * Math.random())
  var s = Math.floor(25 + 70 * Math.random())
  var l = Math.floor(85 + 10 * Math.random())
  return `hsl(${h},${s}%,${l}%)`
}

module.exports = async function(app) {
  return helpers
}
