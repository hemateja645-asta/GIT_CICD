class HospitalPage {
  constructor(page) {
    this.page = page;

    this.hospitalCards = page.locator('div.c-estb-card');
  }

  async navigate() {
    await this.page.goto('https://www.practo.com/', {
      waitUntil: 'domcontentloaded'
    });
  }

  // ✅ ✅ NEW SMART METHOD (STABLE)
  async searchByLocation(city) {

    const formattedCity = city.toLowerCase();

    await this.page.goto(`https://www.practo.com/${formattedCity}/hospitals`, {
      waitUntil: 'domcontentloaded'
    });

    await this.page.waitForLoadState('networkidle');

    // ✅ Wait for actual data
    await this.hospitalCards.first().waitFor({ timeout: 30000 });
  }

  async scrollHospitals() {
    for (let i = 0; i < 5; i++) {
      await this.page.mouse.wheel(0, 2000);
      await this.page.waitForTimeout(1000);
    }
  }
}

module.exports = { HospitalPage };