Feature: Extract Top Cities from Diagnostics Page

  Scenario: Retrieve top cities from Practo diagnostics page

    Given user is on the Practo lab tests page
    When user extracts the list of top cities
    Then user should see the available list of top cities 
