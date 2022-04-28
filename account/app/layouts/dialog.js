module.exports = async function ($) {
  return /* html */ `
    <!doctype html>
    <html lang="${$.lang}">
      ${$.app.views.layout.head($)}
      <body id="dialog-layout">
        <div class="dialog">
          <div class="close">
            <a href="/" onclick="goBack();return false">Close</a>
          </div>
          <div class="dialog-header">
            <h1>${$.page.title}</h1>
          </div>
          <div class="notify"><div class="flash" id="flash"></div></div>
          <div id="dialog-content">${$.page.content}</div>
        </div>
        <script>
          flash()
        </script>
      </body>
    </html>
  `
}
