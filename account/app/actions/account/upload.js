const JIMP_OPTIONS = {
  resize: [100, 100]
}

module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'login-required'
  ])

  await $.validate({
    query: {
      id: {
        required: true,
        is: 'id',
        matcher: async function(id, $) {
          if (id != $.account.id) {
            return 'id does not match current login'
          }
        }
      }
    }
  })

  const { config = JIMP_OPTIONS } = $.params
  const options = { timestamp: true, config }

  const urls = await $.net.upload($.files, options)

  const image = urls[0]
  $.db('account').update({ id: $.account.id }, { image })

  return { image }
}
