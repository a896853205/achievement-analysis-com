const {
  override,
  fixBabelImports,
  addDecoratorsLegacy,
  addWebpackAlias
} = require('customize-cra');
const path = require('path');

// 打包文件大小分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const addCustomize = () => config => {
  if (process.env.NODE_ENV === 'production') {
    config.devtool = false; //去掉map文件
    if (config.plugins) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    const splitChunksConfig = config.optimization.splitChunks;
    if (config.entry && config.entry instanceof Array) {
      config.entry = {
        main: config.entry,
        vendor: [
          'react',
          'react-dom',
          'react-router-dom',
          'react-redux',
          'redux',
          'lodash',
          'moment',
          'react-router'
        ]
      };
    } else if (config.entry && typeof config.entry === 'object') {
      config.entry.vendor = [
        'react',
        'react-dom',
        'react-router-dom',
        'react-redux',
        'redux',
        'lodash',
        'moment',
        'react-router'
      ];
    }

    Object.assign(splitChunksConfig, {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          priority: -10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          minSize: 30000,
          chunks: 'all'
        }
      }
    })
  }
  return config;
};

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    style: 'css'
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  addDecoratorsLegacy(),
  addCustomize()
);
