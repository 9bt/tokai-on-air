const path = require('path');

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

const common = require('./webpack.common');

const envFile = process.env.ENV_FILE || '.env';
require('dotenv').config({
  path: `${__dirname}/../${envFile}`,
});
const uri = new URL(process.env.CLIENT_BASE_URL);

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        const severityIcon =
          {
            warning: '⚠️',
            error: '💢',
          }[severity] || `[${severity.toUpperCase()}]`;

        notifier.notify({
          title: `${severityIcon}`,
          message: `Webpack detected the project has ${errors.length} ${severity.toUpperCase()}(s)`,
          wait: true,
        });
      },
    }),
  ],
  devServer: {
    static: [path.join(__dirname, 'dist'), path.join(__dirname, 'assets')],
    host: uri.hostname,
    port: uri.port,
  },
});
