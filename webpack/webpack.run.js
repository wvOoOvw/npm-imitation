const webpack = require('webpack')
const open = require('open')

if (process.argv.includes('--dev')) {
  const webpackConfig = require('./webpack.dev')
  const compiler = webpack(webpackConfig)

  const serverConfig = { port: 8000 }

  const WebpackDevServer = require('webpack-dev-server')
  const app = new WebpackDevServer(serverConfig, compiler)
  app.start().then(err => {
    if (err) throw err
    open('http://localhost:' + serverConfig.port)
  })
}

if (process.argv.includes('--prod')) {
  const webpackConfig = require('./webpack.prod')

  Promise.all(
    webpackConfig.map(i => new Promise(r => {
      webpack(i, (err, stats) => {
        if (err) throw err
        console.log(stats.toString({ colors: true, modules: true, children: true, chunks: true, chunkModules: true }))
        r()
      })
    }))
  )
}