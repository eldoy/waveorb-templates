window.q=function(e,t,n){return"function"==typeof t&&(n=t,t=void 0),"string"==typeof e&&(e=(t&&q(t)||document).querySelector(e)),"function"==typeof n&&n(e,t),e},window.qa=function(e,t,n){"function"==typeof t&&(n=t,t=void 0);var r=(t&&q(t)||document).querySelectorAll(e);if("function"==typeof n)for(var o=0;o<r.length;o++)n(r[o],t);return r},window.esc=function(e){var t=document.createElement("p");return t.textContent=e,t.innerHTML},window.raw=function(e){var t=document.createElement("p");return t.innerHTML=e,t.textContent},window.css=function(e,t){var n=q(e);if(!n)return null;if("string"==typeof t){if(!(-1<t.indexOf(":")))return n.style[t];n.style.cssText=t}else for(var r in t)n.style[r]=t[r];return n},window.html=function(e,t,n){e=q(e);return e?void 0===t?e.innerHTML:(n?"r"==n[0]?e.outerHTML=t:e.insertAdjacentHTML(("b"==n[0]?"beforebegin":"a"==n[0]&&"afterend")||"t"==n[0]&&"afterbegin"||"e"==n[0]&&"beforeend",t):e.innerHTML=t,e):null},window.text=function(e,t){e=q(e);return e?void 0===t?e.textContent:(e.textContent=t,e):null},window.attr=function(e,t,n){var r=q(e);if(!r)return null;if("string"==typeof t){if(void 0===n)return r.getAttribute(t);r.setAttribute(t,n)}else for(var o in t)null==t[o]?r.removeAttribute(o):r.setAttribute(o,t[o]);return r},window.time=function(e,t){if(!e)return"";"string"==typeof e&&(e=new Date(e)),t=t||{};var n=new Intl.DateTimeFormat(t.lang||"en",t),r=t.format;if(r){var o={};return n.formatToParts(e).forEach(function(e){o[e.type]=e.value}),(r.match(/%[A-z]+/gi)||[]).forEach(function(e){var t=e.slice(1).toLowerCase(),t=o[t];t&&("string"==typeof t&&/[A-Z]/.test(e[1])&&(t=t[0].toUpperCase()+t.slice(1)),r=r.replace(e,t))}),r}return n.format(e)},window.params=function(e){if(null==e)return"";if("string"!=typeof e)return e=parseInt(e||0)+1,location.pathname.split("/")[e];e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");e=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(location.search);return null==e?"":decodeURIComponent(e[1].replace(/\+/g," "))},window.cookie=function(e,t,n){if(void 0===t)return(t=document.cookie.match("(^|;) ?"+e+"=([^;]*)(;|$)"))?decodeURIComponent(t[2]):null;n=n||{},null===t&&(t="",n.days=-1);var r=n.days||30,o=n.sameSite||"Lax",i=n.httpOnly?";HttpOnly":"",a=n.secure?";Secure":"",n=new Date;n.setTime(n.getTime()+864e5*r),document.cookie=e+"="+encodeURIComponent(t)+";path=/;expires="+n.toUTCString()+";SameSite="+o+i+a},window.store=function(t,e){function n(){var e=sessionStorage.getItem(t);if(null!=e)return JSON.parse(e)}if(!t)return sessionStorage.clear();if(null!==e)return null!=e?(sessionStorage.setItem(t,JSON.stringify(e)),e):n();e=n();return sessionStorage.removeItem(t),e},window.serialize=function(e){if("string"==typeof e&&(e=q(e)),!e)return{};var t,n,r={};function o(e){return!e.value.length||"number"!=e.getAttribute("data-type")&&"number"!=e.type?e.value:parseFloat(e.value)}for(var i=0;i<e.elements.length;i++){var a=e.elements[i];if(a.name&&!a.disabled&&["file","reset","submit","button"].indexOf(a.type)<0)if("select-multiple"==a.type){for(var l=0,u=[];l<a.options.length;l++)(t=a.options[l]).selected&&u.push(o(t));u.length&&(r[a.name]=u)}else"checkbox"==a.type?a.checked&&(r[n=a.name]||(r[n]=[]),r[n].push(o(a))):"radio"==a.type&&!a.checked||""==a.value&&""==a.getAttribute("data-blank")||(r[a.name]=o(a))}return r},window.flash=function(e,t){t=t||{};var n=q(t.el||"#flash"),r=t.time||5e3,o=t.name||"flash";return n?(void 0!==window.__$flash&&clearTimeout(window.__$flash),e=(e||cookie(o)||"").trim(),cookie(o,null),0!=t.scroll&&scroll(0,0),t.class&&n.classList.add(t.class),n.textContent=e,n.style.opacity=1,r&&(window.__$flash=setTimeout(function(){n.style.opacity=0,t.class&&n.classList.remove(t.class)},r)),n):null};