module.exports = {
  lintOnSave: false,
  publicPath: './',
  configureWebpack: {
    externals: {
      axios: 'axios'
    }
  }
}