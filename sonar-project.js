const sonarqubeScanner = require('sonarqube-scanner');
// import sonarqubeScanner from "sonarqube-scanner";

sonarqubeScanner({
  serverUrl: 'http://localhost:9000',
  options : {
  'sonar.sources': '.',
  'sonar.inclusions' : 'src/**', // Entry point of your code
  'sonar.exclusions' : 'src/**/*.test.js' // Ignore test files
  }
}, () => {});