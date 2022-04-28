module.exports = async function($) {
  return /* html */ `
    <!doctype html>
    <html lang="${$.lang}">
      ${$.app.views.layout.head($)}
      <body><main>${$.page.content}</main></body>
    </html>
  `

}