module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          // you can import styles here to make them import in every vue component
        `
      }
    }
  }
}