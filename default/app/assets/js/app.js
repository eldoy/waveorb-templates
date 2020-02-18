var timeout

function formButton(form) {
  var button = q('button', form)
  button.style.width = button.offsetWidth + 'px'
  button.disabled = true
  return button
}

function clearFields(field) {
  var el = q(`.${field.name}-errors`, field.parentNode)
  if (!el) return
  el.style.opacity = 0
  setTimeout(function() {
    text(el, '')
    el.style.opacity = 1
  }, 210)
}

function showErrors(result, key) {
  if (!key) key = 'data'
  flash(result.error.message)
  for (var field in result[key]) {
    var el = q(`.${ field }-errors`)
    if (el) {
      text(el, result[key][field].join(', '))
      el.style.fontSize = '96%'
      setTimeout(function() { el.style.fontSize = '90%' }, 60)
    }
  }
}
