module.exports = async function($) {
  await $.filters([
    'setup-site',
    'authenticate',
    'guest-required'
  ])

  await $.allow({
    query: ['key']
  })

  await $.validate({
    query: {
      key: {
        matcher: async function(key, $) {
          $.reset = await $.db('reset').get({ key })
          if (!$.reset) {
            return 'key is invalid'
          }
          if (new Date().getTime() > $.reset.time) {
            await $.db('reset').delete({ key })
            return 'key has expired'
          }
        },
        required: true
      }
    }
  })
  return { reset: $.reset }
}
