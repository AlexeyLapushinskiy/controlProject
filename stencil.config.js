exports.config = {
  namespace: 'mycomponent',
  generateDistribution: true,
  bundles: [
    { components: ['my-component'] }
  ],
  serviceWorker: {
    globPatterns: [
      '**/*.{js,css,json,html,ico,png,jpeg}'
    ]
  }
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
