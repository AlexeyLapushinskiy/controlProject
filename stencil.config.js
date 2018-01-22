exports.config = {
  namespace: 'mycomponent',
  generateDistribution: true,
  bundles: [
    { components: ['my-dynamic-form', 'my-number-input', 'my-text-input', 'my-text-input-array', 'my-checkbox', 'my-button'] }
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
