/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

'use strict';

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2020',
  },
});

module.exports = require('./src/config/gatsby-node');
