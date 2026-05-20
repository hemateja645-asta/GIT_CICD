const { Given, When, Then } = require('@cucumber/cucumber');
const { HospitalPage } = require('../Pages/hospitals.page.js');

let hospitalPage;
let hospitals;
let filteredHospitals = [];

// ✅ Given
Given('user launches Practo homepage', async function () {
    hospitalPage = new HospitalPage(this.page);
    await hospitalPage.navigate();
});

// ✅ When (UPDATED ✅)
When('user searches hospitals in {string}', async function (city) {

    await hospitalPage.searchByLocation(city);

    // ✅ optional scroll for more data
    await hospitalPage.scrollHospitals();

    hospitals = hospitalPage.hospitalCards;
});

// ✅ Then → filter logic
Then('user filters hospitals with rating > 3.5 and open 24x7', async function () {

    const count = await hospitals.count();
    const maxHospitals = Math.min(count, 20);

    filteredHospitals = [];

    for (let i = 0; i < maxHospitals; i++) {

        try {
            const hospital = hospitals.nth(i);
            const nameLocator = hospital.locator('a[href*="/hospital/"]').first();

            if (await nameLocator.count() === 0) continue;

            const hospitalName = (await nameLocator.textContent())?.trim();
            if (!hospitalName) continue;

            const hospitalLink = await nameLocator.getAttribute('href');
            if (!hospitalLink) continue;

            let rating = 0;

            const ratingLocator = hospital.locator('div.c-feedback span.u-bold');
            if (await ratingLocator.count() > 0) {
                const ratingText = (await ratingLocator.first().textContent())?.trim();
                if (ratingText) rating = parseFloat(ratingText);
            }

            if (isNaN(rating)) continue;

            const hospitalText = (await hospital.textContent())?.toLowerCase();
            const isOpen24 = hospitalText.includes('open 24x7');

            if (rating > 3.5 && isOpen24) {
                filteredHospitals.push({
                    name: hospitalName,
                    link: hospitalLink,
                    rating: rating
                });
            }

        } catch (error) {
            console.log(`Skipping hospital ${i + 1}`);
        }
    }
});

// ✅ Then → parking validation
Then('user verifies parking availability', async function () {

    console.log('\n===== FINAL HOSPITAL LIST =====');

    const printedHospitals = new Set();

    for (let hospital of filteredHospitals) {

        const detailPage = await this.page.context().newPage();
        let hasParking = false;

        try {
            await detailPage.goto(`https://www.practo.com${hospital.link}`, {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            });

            const bodyText = (await detailPage.locator('body').textContent()).toLowerCase();

            hasParking =
                bodyText.includes('parking') ||
                bodyText.includes('car parking') ||
                bodyText.includes('bike parking') ||
                bodyText.includes('valet');

        } catch (error) {
            console.log(`Unable to open : ${hospital.name}`);
        }

        await detailPage.close();

        if (!printedHospitals.has(hospital.name)) {

            printedHospitals.add(hospital.name);

            console.log('\n------------------------------');
            console.log(`Hospital Name : ${hospital.name}`);
            console.log(`Rating        : ${hospital.rating}`);
            console.log(`Status        : Open 24x7`);
            console.log(`Parking       : ${hasParking ? 'Available' : 'Not Mentioned'}`);
        }
    }

    if (filteredHospitals.length === 0) {
        throw new Error("No hospitals matched the criteria");
    }

    console.log('\n========= TEST COMPLETED =========');
});