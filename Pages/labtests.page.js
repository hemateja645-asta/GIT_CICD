class LabTestsPage {
    constructor(page) {
        this.page = page;

        // ✅ correct locator
        this.cityLabels = page.locator('div.u-margint--standard.o-f-color--primary');
    }

    async navigateToTests() {

        await this.page.goto('https://www.practo.com/tests', {
            waitUntil: 'domcontentloaded'
        });

        // ✅ wait for data to actually load
        await this.page.waitForLoadState('networkidle');
    }

    async getTopCities() {

        // ✅ VERY IMPORTANT: wait for cities to appear
        await this.cityLabels.first().waitFor({ timeout: 15000 });

        // ✅ extract + clean data
        const cities = await this.cityLabels.allTextContents();

        return cities
            .map(city => city.trim())
            .filter(city => city.length > 0);
    }
}

module.exports = { LabTestsPage };