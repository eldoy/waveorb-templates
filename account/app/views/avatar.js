const esc = require('escape-html')

module.exports = function avatar({ image, name, color }, opt = {}){
  if (!opt.size) opt.size = ''
  return /* html */`
    <div class="blokk-avatar">
      ${function(){
        if (image) {
          return /* html */`
            <img class="${opt.size}" src="${esc(image)}">
          `
        }

        var initials = name
          .split(' ')
          .slice(0, 2)
          .map(part => part[0])
          .join('')
          .toUpperCase()

        return /* html */`
          <span class="initials ${opt.size}"${color ? ` style="background:${color}"` : ''}>${initials}</span>
        `
      }()}
    </div>
  `
}
