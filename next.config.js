/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const path = require('path');
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
  [withPWA],
  {
    pwa: {
    dest: 'public',
    },
    reactStrictMode: true,
   
    webpack(config) {
      const experiments = config.experiments || {};
      config.experiments = {...experiments, asyncWebAssembly: true};
      config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'
      return config
    },
  }
])
