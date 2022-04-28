module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'login-required',
    'require-editor'
  ])

  const { config } = $.params
  const options = { timestamp: true, config }

  await $.net.upload($.files, options)

  return $.files.map(f => ({
    name: f.name,
    type: f.type,
    size: f.size,
    url: f.url
  }))
}
