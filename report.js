const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/lab-report.json',   // ✅ match actual JSON
  output: 'reports/lab-report.html',
  reportSuiteAsScenarios: true,
  launchReport: true
};

reporter.generate(options);