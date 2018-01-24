exports.config = {
  namespace: 'mycomponent',
  generateDistribution: true,
  bundles: [
    { components: ['my-dynamic-form', 'my-number-input', 'my-text-input', 'my-checkbox', 'my-button', 'my-dropdown'] }
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
