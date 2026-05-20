const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

 Given('I navigate to Practo website', async function () {
  await this.page.goto('https://www.practo.com/');
  await this.page.waitForSelector('#c-omni-container');
});


When('I click on search box', async function () {
  await this.page.waitForLoadState('networkidle');

    await this.page.locator('input[placeholder*="Search"]').first().click();
});

When('I select {string} speciality', async function (speciality) {
  const searchBox = this.page.locator('#c-omni-container input').nth(1);

  await searchBox.waitFor({ state: 'visible' });
  await searchBox.click();
  await searchBox.fill('');

  await searchBox.type(speciality, { delay: 100 }); // human typing
  await this.page.waitForTimeout(1000); // allow suggestions to load

  await searchBox.press('Enter');
});

Then('I should see dentists available in Chennai', async function () {
  await expect(
    this.page.getByRole('heading', { name: 'Dentists available in Chennai' })
  ).toBeVisible();
});



Given('user Practo homepage', async function () {

    await this.page.goto('https://www.practo.com/', {
        waitUntil: 'networkidle'
    });
});

When('user clicks on search for hospitals', async function () {

   await this.page.locator('input[placeholder*="Search"]').first().click();

    // await hospitalLink.waitFor({ state: 'visible', timeout: 15000 });

    // await hospitalLink.click();
});

When('user enters location {string}', async function (text) {

    const locationInput = this.page.locator('[data-qa-id="omni-searchbox-locality"]');

    await this.page.waitForSelector('[data-qa-id="omni-searchbox-locality"]');

    // ✅ focus field
    await locationInput.click();

    // ✅ clear (important if Bangalore exists)
    await locationInput.press('Control+A');
    await locationInput.press('Backspace');

    // ✅ TYPE SLOWLY (key fix 🚀)
    await locationInput.type(text, { delay: 200 });

    // ✅ wait small buffer for suggestions
    await this.page.waitForTimeout(2000);
});




// ✅ Validate suggestions
Then('suggestions should be visible', async function () {

    // ✅ correct locator from your HTML
    const suggestions = this.page.locator('[data-qa-id="omni-suggestion-city"]');

    // ✅ wait for suggestions to appear
    await suggestions.first().waitFor({ timeout: 15000 });

    const count = await suggestions.count();

    console.log("✅ Suggestions Count:", count);

    expect(count).toBeGreaterThan(0);
});