Feature: Corporate Wellness Form Validation

  Scenario Outline: Validate corporate form with different inputs

    Given user is on Practo homepage
   
    When user enters name "<name>"
    When user enters organization name "<orgName>"
    When user enters contact number "<contact>"
    When user enters email "<email>"
    When user selects organization size "<orgSize>"
    When user selects interest "<interest>"
    Then validate phone number and email format
    And demo button should be "<status>"

  Examples:
    | name        | orgName       | contact     | email                          | orgSize | interest         | status   |
    | Gnana       | Cognizant     | 1234567890  | invalid-email                  | 10001+  | Taking a demo    | disabled |
    | Kiran Kumar | Infosys Ltd   | 9876543210  | kiran@gmail.com                | 10001+  | Taking a demo    | enabled  |
    | Ravi Teja   | TCS Ltd       | 5678901234  | ravi@yahoo.com                 | 10001+  | Taking a demo    | disabled |
    | Anil Raj    | Wipro Ltd     | 9123456789  | anil@company.co.in             | 10001+  | Taking a demo    | enabled  |