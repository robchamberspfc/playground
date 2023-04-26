// import open, {openApp, apps} from 'open';

// console.log("hello")

// open('http://sindresorhus.com');

// console.log("hello")


const {Builder} = require('selenium-webdriver');
// require("chromedriver");

// (async function helloSelenium() {
//   let driver = await new Builder().forBrowser('chrome').build();

//   await driver.get("http://google.com");
//   await driver.findElement(By.name("q").sendKeys("Selenium",Key.RETURN));


// //   await driver.get('https://selenium.dev');

// //   await driver.quit();
// })();

// Include the chrome driver
require("chromedriver");
  
// Include selenium webdriver
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();
  
// Get the credentials from the JSON file
let { email, pass } = require("./credentials.json");
  
// Step 1 - Opening the geeksforgeeks sign in page
let tabToOpen =
    tab.get("https://uk-ons.enterprise.slack.com/?no_sso=1&redir=%2F");
tabToOpen
    .then(function () {
  
        // Timeout to wait if connection is slow
        let findTimeOutP =
            tab.manage().setTimeouts({
                implicit: 10000, // 10 seconds
            });
        return findTimeOutP;
    })
    .then(function () {
  
        // Step 2 - Finding the username input
        let promiseUsernameBox =
            tab.findElement(swd.By.id("email"));
        return promiseUsernameBox;
    })
    .then(function (usernameBox) {
  
        // Step 3 - Entering the username
        let promiseFillUsername =
            usernameBox.sendKeys(email);
        return promiseFillUsername;
    })
    .then(function () {
        console.log(
            "Username entered successfully"
        );
  
        // Step 4 - Finding the password input
        let promisePasswordBox =
            tab.findElement(swd.By.id("password"));
        return promisePasswordBox;
    })
    .then(function (passwordBox) {
  
        // Step 5 - Entering the password
        let promiseFillPassword =
            passwordBox.sendKeys(pass);
        return promiseFillPassword;
    })
    .then(function () {
        console.log(
            "Password entered successfully"
        );
  
        // Step 6 - Finding the Sign In button
        let promiseSignInBtn = tab.findElement(
            swd.By.css(".btn.btn_large.full_width.ladda-button")
        );
        return promiseSignInBtn;
    })
    .then(function (signInBtn) {
  
        // Step 7 - Clicking the Sign In button
        let promiseClickSignIn = signInBtn.click();
        return promiseClickSignIn;
    })
    .then(function () {
        console.log("Successfully signed in GEEKSFORGEEKS!");
    })
    .catch(function (err) {
        console.log("Error ", err, " occurred!");
    });