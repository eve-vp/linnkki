
// react.config.js
export function chainWebpack(config) {
  // Agrega la generación de source maps
  config.devtool('source-map');

  // Agrega tu regla existente para archivos SVG
  config.module
    .rule('svg')
    .test(/\.svg$/)
    .use('@svgr/webpack')
    .loader('@svgr/webpack');
}
