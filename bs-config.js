module.exports = {
  server: {
    middleware: {
      // overrides the second middleware default with new settings 
      0: require('connect-history-api-fallback')({index: '/demo/index.html', verbose: true})
    }
  }
};