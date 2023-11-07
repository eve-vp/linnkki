module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('@svgr/webpack')
      .loader('@svgr/webpack');
  },
};