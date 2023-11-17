const path = require('path');

module.exports = {
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
  resolver: {
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => path.join(__dirname, `node_modules/${name}`),
      }
    ),
  },
};
