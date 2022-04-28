module.exports = function($) {
  return /* html */`
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="${$.page.description}">
      <title>${$.page.title || '♥'}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet">
      <link rel="icon" type="image/png" href="/img/favicon.png">
      ${$.script('/bundle.js')}
      ${$.style('/bundle.css')}
      <script>
        window.account = ${JSON.stringify($.account)}
        window.avatar = ${$.app.views.avatar}
        window.api = waveorb('${$.app.config.env.host}')
      </script>
      ${process.env.NODE_ENV == 'development' ? '<script src="/js/dev.js"></script>' : ''}
    </head>
  `
}