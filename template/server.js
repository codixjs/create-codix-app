const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const clientDictionary = path.resolve(__dirname, 'dist', 'ssr', 'client');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = 8080;

(async () => {
  const { getAssets } = await import('@codixjs/vite');
  const render = await import('./dist/ssr/server/server.mjs');
  return {
    assets: await getAssets(render.default.prefix, 'src/entries/client.tsx', clientDictionary),
    runner: render.default.middleware,
    prefix: render.default.prefix,
  }
})().then(({ assets, runner, prefix }) => {
  const app = express();
  app.use(prefix, serveStatic(clientDictionary));
  app.use(createProxyMiddleware('/api', {
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
  }))
  app.get(prefix + '*', (req, res, next) => {
    req.HTMLAssets = assets;
    req.HTMLStates = {};
    const [matched, stream] = runner(req);
    if (!matched) return next();
    res.statusCode = 200;
    res.setHeader("Content-type", "text/html; charset=utf-8");
    stream.on('error', e => {
      switch (e.code) {
        case 301:
        case 302:
          res.setHeader('Location', e.url);
          res.setHeader('Content-type', 'text/html; charset=utf-8');
          res.statusCode = e.code;
          res.end(e.stack);
          break;
        default:
          res.statusCode = typeof e.code === 'number' ? e.code : 500;
          res.end(e.stack);
      }
    }).pipe(res);
  })
  app.listen(port, err => {
    if (err) throw err;
    console.log('ready on localhot:' + port);
  })
}).catch(e => {
  console.log('发生错误，无法启动服务器:', e.message);
})