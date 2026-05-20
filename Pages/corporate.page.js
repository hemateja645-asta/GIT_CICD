class CorporatePage {
  constructor(page) {
    this.page = page;

    // ✅ Only keep required fields
    this.nameInput = page.getByRole('textbox', { name: 'Name', exact: true });
    this.orgNameInput = page.getByRole('textbox', { name: 'Organization Name' });
    this.contactInput = page.getByRole('textbox', { name: 'Contact Number' });
    this.emailInput = page.getByRole('textbox', { name: 'Official Email ID' });

    this.orgSizeSelect = page.locator('#organizationSize:visible');
    this.interestedInSelect = page.locator('#interestedIn:visible');

    this.demoButton = page.getByRole('button', { name: 'Schedule a demo' });
  }

  async navigate() {
    await this.page.goto('https://www.practo.com/', {
      waitUntil: 'domcontentloaded'
    });
  }

  // ✅ ✅ FINAL FIX (NO CLICK, DIRECT URL)
  async openCorporatePage() {

    await this.page.goto('https://www.practo.com/plus/corporate', {
      waitUntil: 'domcontentloaded'
    });

    // ✅ wait for form (REAL SIGNAL)
    await this.nameInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async fillCorporateForm(name, orgName, contact, email, orgSize, interest) {

    await this.nameInput.fill(name);
    await this.orgNameInput.fill(orgName);
    await this.contactInput.fill(contact);
    await this.emailInput.fill(email);

    await this.orgSizeSelect.selectOption(orgSize);
    await this.interestedInSelect.selectOption(interest);

    await this.page.click('body'); // trigger validation
  }

  async isDemoButtonDisabled() {
    return await this.demoButton.isDisabled();
  }

  validatePhoneNumber(phone) {
    return /^[6-9][0-9]{9}$/.test(phone);
  }

  validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@(gmail\.com|.*\.co\.in)$/.test(email);
  }
}

module.exports = { CorporatePage };