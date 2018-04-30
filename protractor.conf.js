// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  //for use with selenium
  //seleniumAddress: 'http://selenium:4444/wd/hub',
  seleniumAddress: 'http://localhost:4444/wd/hub',

  directConnect: false,
  //needs to be ran on the selenium docker image, or if running in a docker compose setup with the image name of
  //the web app.
  //baseUrl: 'http://app:4200/',
  baseUrl: 'http://172.22.124.225:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
