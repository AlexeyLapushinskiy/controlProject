exports.config = {
  namespace: 'mycomponent',
  generateDistribution: true,
  bundles: [
    { components: ['my-dynamic-form', 'my-input', 'my-checkbox', 'my-dropdown', 'my-datepicker'] }
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
