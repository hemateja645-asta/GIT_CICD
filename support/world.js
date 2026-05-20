const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
  constructor() {

    // ✅ browser objects
    this.browser = null;
    this.context = null;
    this.page = null;

    // ✅ page objects
    this.corporatePage = null;   // ⭐ add this

    // ✅ test data
    this.name = null;
    this.orgName = null;
    this.contact = null;
    this.email = null;
    this.orgSize = null;
    this.interest = null;

    // ✅ result
    this.isDisabled = null;
  }
}

setWorldConstructor(CustomWorld);
