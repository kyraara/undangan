const Module = require('module')
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

process.env.APP_ROOT = __dirname

// Turbopack externalizes mysql2 with a hash suffix (e.g. mysql2-f4aadf907e8d691f).
// Intercept those requires and redirect to the real package.
const _load = Module._load.bind(Module)
Module._load = function (request, parent, isMain) {
  if (/^mysql2-[0-9a-f]+(\/.*)?$/.test(request)) {
    const redirect = request.replace(/^mysql2-[0-9a-f]+/, 'mysql2')
    return _load(redirect, parent, isMain)
  }
  return _load(request, parent, isMain)
}

const app = next({ dev: false, dir: __dirname })
const handle = app.getRequestHandler()
const port = parseInt(process.env.PORT, 10) || 3000

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, () => {
    console.log('> Server ready on port ' + port)
  })
})
