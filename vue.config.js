module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/apinder-vue/' // Reemplaza con el nombre de tu repositorio
    : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true
  }
}

