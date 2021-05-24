const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          // you can import styles here to make them import in every vue component
        `
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        // following alias lets you use "@/...." in imports
        '@': path.resolve(__dirname, 'src')
      }
    },
  }
}