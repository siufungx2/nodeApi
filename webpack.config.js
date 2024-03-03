const path = require('path');

module.exports = {
  // ... other webpack configurations...
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
