const esc = require('escape-html')
const shortn = require('shortn')

module.exports = function($) {
  return /* html */`
    <div id="menu">
      <a id="toggler" onclick="handleToggleMenu()" href="javascript:void(0)" data-toggle="#main-menu">
        Menu
      </a>
      <div id="main-menu">
        ${function(){
          if ($.account) {
            return /* html */`
              <a href="${$.link('profile')}">Profile</a>
              <a href="${$.link('account')}">Account</a>
              <a href="${$.link('logout')}">Logout</a>
            `
          }
          return /* html */`
            <a href="${$.link('login')}">Login</a>
            <a href="${$.link('signup')}">Signup</a>
          `

        }()}

      </div>
    </div>
  `
}