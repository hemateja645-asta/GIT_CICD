module.exports = {
  default: {
    require: [
      "step_definitions/**/*.js",   // ✅ important
      "support/**/*.js"
    ],
    

    format: ["progress",
      
           "json:reports/cucumber-report.json",
            // ✅ added JSON report
            "allure-cucumberjs/reporter"
    ],
    
formatOptions: {
      resultsDir: "allure-results"          // ✅ required for Allure
    },


    
    timeout: 180000
  }
};