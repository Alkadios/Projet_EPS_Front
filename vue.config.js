module.exports = {
  devServer: {
    headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
    port: 8080,
  },
  publicPath: '/',
  pwa: {
    name: 'OCPEPS',
    themeColor: '#4e73df',
    icons: {
      favicon32: 'assets/icons/favicon-32x32.png',
      favicon16: 'assets/icons/favicon-16x16.png',
      appleTouchIcon: 'assets/icons/apple-touch-icon-152x152.png',
      maskIcon: 'assets/icons/safari-pinned-tab.svg',
      msTileImage: 'assets/icons/msapplication-icon-144x144.png',
    },
  },
};
