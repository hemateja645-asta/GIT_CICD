Feature: Practo Dentist Search

  Scenario: Search for dentists using speciality search
    Given I navigate to Practo website
    When I click on search box
    And I select "Dentist" speciality
    Then I should see dentists available in Chennai

Scenario: Enter partial location and select suggestion
  Given user Practo homepage
  When user clicks on search for hospitals
  And user enters location "Che"
  Then suggestions should be visible