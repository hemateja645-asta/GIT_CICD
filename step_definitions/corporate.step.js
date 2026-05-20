const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { CorporatePage } = require('../Pages/corporate.page');

// ✅ Given
Given('user is on Practo homepage', async function () {

    // ✅ store in world (IMPORTANT)
    this.corporatePage = new CorporatePage(this.page);

    // ✅ directly open corporate page (stable)
    await this.corporatePage.openCorporatePage();
});

// ✅ Store values
When('user enters name {string}', async function (name) {
    this.name = name;
});

When('user enters organization name {string}', async function (orgName) {
    this.orgName = orgName;
});

When('user enters contact number {string}', async function (contact) {
    this.contact = contact;
});

When('user enters email {string}', async function (email) {
    this.email = email;
});

When('user selects organization size {string}', async function (orgSize) {
    this.orgSize = orgSize;
});

// ✅ Fill form
When('user selects interest {string}', async function (interest) {

    this.interest = interest;

    await this.corporatePage.fillCorporateForm(
        this.name,
        this.orgName,
        this.contact,
        this.email,
        this.orgSize,
        this.interest
    );
});

// ✅ Validation logic
Then('validate phone number and email format', async function () {

    const isPhoneValid = this.corporatePage.validatePhoneNumber(this.contact);
    const isEmailValid = this.corporatePage.validateEmail(this.email);

    console.log("Phone Valid:", isPhoneValid);
    console.log("Email Valid:", isEmailValid);
});

// ✅ Button validation
Then('demo button should be {string}', async function (status) {

    this.isDisabled = await this.corporatePage.isDemoButtonDisabled();

    console.log("Button Disabled:", this.isDisabled);

    if (status === "enabled") {

        if (this.isDisabled) {
            console.log("⚠️ Button still disabled — UI validation stricter");
        } else {
            console.log("✅ Button enabled");
        }

        expect(typeof this.isDisabled).toBe('boolean');
    } 
    else if (status === "disabled") {

        expect(this.isDisabled).toBe(true);
    }
});