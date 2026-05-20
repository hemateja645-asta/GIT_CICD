const { Given, When, Then,setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60*1000);
const { LabTestsPage } = require('../Pages/labtests.page');

let labPage;
let cities = [];

// ✅ Given step
// Given('user is on the Practo lab tests page', async function () {
Given('user is on the Practo lab tests page', async function () {
    labPage = new LabTestsPage(this.page);
    await labPage.navigateToTests();
});

// ✅ When step
// When('user extracts the list of top cities', async function () {
When('user extracts the list of top cities', async function () {
    cities = await labPage.getTopCities();
});

// ✅ Then step
// Then('user should see the list of available top cities', async function () {
Then('user should see the available list of top cities', async function () {

    console.log("\n===== TOP CITIES =====");

    if (!cities || cities.length === 0) {
        throw new Error("❌ No cities were found on the lab tests page");
    }

    cities.forEach((city, index) => {
        console.log(`${index + 1}. ${city}`);
    });
});
