
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/wynston/Development/fps-hk/docs/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/wynston/Development/fps-hk/docs/src/pages/404.js")),
  "component---src-pages-bank-list-js": preferDefault(require("/Users/wynston/Development/fps-hk/docs/src/pages/bankList.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/wynston/Development/fps-hk/docs/src/pages/index.js"))
}

