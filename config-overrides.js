const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: { 
      '@component': path.resolve(__dirname, 'src', 'componentes'),
      '@type': path.resolve(__dirname, 'src', 'type'),
    }
  };

  return config;
};