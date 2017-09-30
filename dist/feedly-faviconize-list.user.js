// ==UserScript==
// @name            Feedly Faviconize List
// @namespace       jmln.tw
// @version         0.2.0
// @description     A user script to show feed favicons in Feedly Title-Only View.
// @author          Jimmy Lin
// @license         MIT
// @homepage        https://github.com/jmlntw/feedly-faviconize-list
// @supportURL      https://github.com/jmlntw/feedly-faviconize-list/issues
// @match           https://*.feedly.com/*
// @compatible      firefox
// @compatible      chrome
// @compatible      opera
// @run-at          document-end
// @grant           none
// ==/UserScript==

// eslint-disable-next-line camelcase
function GM_addStyle (css) {
  const style = document.createElement('style')
  style.type = 'text/css'
  style.textContent = css
  document.head.appendChild(style)
  return style
}

GM_addStyle('.GM_favicon { margin-right: 0.5em; vertical-align: middle; }')

const observer = new window.MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const target = mutation.target
    if (target.classList.contains('entry') && target.querySelector('.GM_favicon') === null) {
      const source = target.querySelector('a.source')
      if (source !== null) {
        const domain = source.href.replace(/^https?:\/\/(?:www.)?([^/:]+).*/i, '$1')
        const favicon = document.createElement('img')
        favicon.src = `https://www.google.com/s2/favicons?domain=${domain}&alt=feed`
        favicon.classList.add('GM_favicon')
        source.insertAdjacentElement('afterbegin', favicon)
      }
    }
  })
})
observer.observe(document.getElementById('box'), { childList: true, subtree: true })
