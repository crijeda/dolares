Package.describe({
  name: 'npm-dependencies',
  version: '1.0.0'
});

Npm.depends({
  'phantomjs-wrapper': '0.0.11'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.addFiles('npm.js');

  api.export(['phantomjs']);
});
