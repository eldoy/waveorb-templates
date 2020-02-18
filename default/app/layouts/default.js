module.exports = async function($) {
  var host = $.req.headers['x-waveorb-build']
    ? 'https://example.com/api'
    : 'http://localhost:5000'

  function init() {
    var u = cookie('token')
    document.querySelectorAll('header a').forEach(function(a) {
      if (u && a.classList.contains('public') || !u && a.classList.contains('admin')) {
        a.style.display = 'none'
      }
      if (a.pathname == location.pathname) {
        a.classList.add('active')
      }
    })
  }

  return /* html */`
    <!doctype html>
    <html lang="en">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="${ $.t('layouts.description') }">
        <title>${ $.page.title || '♥' } - ${ $.t('layouts.title') }</title>
        <link rel="icon" type="image/png" href="/img/favicon.png">
        ${ $.script('/bundle.js') }
        ${ $.style('/bundle.css') }
        <script>window.api = waveorb('${ host }')</script>
      </head>
      <body>
        <header>
          <nav>
            <a href="${ $.link('index') }">${ $.t('layouts.nav.home') }</a>
            <a href="${ $.link('about') }">${ $.t('layouts.nav.about') }</a>
            <a href="${ $.link('terms') }">${ $.t('layouts.nav.terms') }</a>
            <a href="${ $.link('privacy') }">${ $.t('layouts.nav.privacy') }</a>
            <a href="${ $.link('contact') }">${ $.t('layouts.nav.contact') }</a>
            <a href="${ $.link('upload') }">${ $.t('layouts.nav.upload') }</a>
            <a class="public" href="${ $.link('signup') }">${ $.t('layouts.nav.signup') }</a>
            <a class="public" href="${ $.link('login') }">${ $.t('layouts.nav.login') }</a>
            <a class="admin" href="${ $.link('sites') }">${ $.t('layouts.nav.sites') }</a>
            <a class="admin" href="${ $.link('settings') }">${ $.t('layouts.nav.settings') }</a>
            <a class="admin" href="javascript:void(0)" onclick="handleLogout();return false">${ $.t('layouts.nav.logout') }</a>
            <span class="lang">
              <a href="${ $.link(`en@${ $.page.name }`) }" onclick="window.cookie('lang', 'en')">EN</a>
              <span class="split">/</span>
              <a href="${ $.link(`no@${ $.page.name }`) }" onclick="window.cookie('lang', 'no')">NO</a>
            </span>
            <script>${ init };init()</script>
          </nav>
          <div class="flash" onclick="this.style.opacity = 0"></div>
        </header>
        <div class="main">${ $.page.content }</div>
        <script>flash()</script>
        <script src="/js/app.js"></script>
        <script>
          async function handleLogout() {
            const token = cookie('token')
            if (token) {
              var result = await api.action('deleteSession', { data: { token } })
              console.log(result)
              if (result.error) {
                flash(result.error.message)
              } else {
                cookie('token', '', -1)
                cookie('flash', $.t('layouts.logout'))
                location = $.link('index')
              }
            }
          }
        </script>
      </body>
    </html>
  `
}
