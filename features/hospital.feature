Feature: Find Hospitals based on filters

  Scenario Outline: Verify hospitals with rating, 24x7 and parking

    Given user launches Practo homepage
    When user searches hospitals in "<city>"
    Then user filters hospitals with rating > 3.5 and open 24x7
    And user verifies parking availability

  Examples:
    | city       |
    | Bangalore  |
    | Chennai    |
 