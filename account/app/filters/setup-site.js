const URL = require('url').URL

// Setup site subdomain and load config
module.exports = async function($) {
  // const url = new URL($.req.headers.referer)
  // const hostname = url.hostname
  // const domain = $.app.config.env.domain

  // if (hostname.endsWith(domain)) {
  //   const subdomain = hostname.split('.')[0]
  //   $.site = await $.db('site').get({ subdomain })
  // } else {
  //   $.site = await $.db('site').get({ domain: hostname })
  // }

  // if (process.env.NODE_ENV == 'development' && !$.site) {
  //   $.site = await $.db('site').get()
  // }

  // if (!$.site) {
  //   return {}
  // }

  // $.site.config = await $.db('configuration').get({ site_id: $.site.id })
}
