module.exports = async function(req, res) {
  // Example CORS middleware

  // Simple, allow all domains:
  // res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Access-Control-Allow-Credentials', 'true')

  // Advanced, more control:
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost')
  // res.setHeader('Access-Control-Allow-Credentials', 'true')
  // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control')
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
}
