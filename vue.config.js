const path = require('path');

module.exports = {
  // NOTE: config change isn't detected by 'serve'
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          // you can import styles here to make them import in every vue component
          @import "@/styles/style.scss";
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