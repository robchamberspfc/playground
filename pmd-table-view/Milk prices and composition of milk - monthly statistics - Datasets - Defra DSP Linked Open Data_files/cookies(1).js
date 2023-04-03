/**
 * The public interface for the cookie policy manager.
 * @typedef {object} CookiePolicyManager
 * @property {getUserAcceptedCookiePolicyVersion} getUserAcceptedCookiePolicyVersion - Indicates whether the Courage component is present.
 * @property {getUserAcceptedLevel} getUserAcceptedCookiePolicyLevel - Indicates whether the Power component is present.
 * @property {checkUsersCookieAcceptanceVersion} checkUsersCookieAcceptanceVersion - Indicates whether the Wisdom component is present.
 * @property {shouldCookieBannerBeDisplayed} shouldCookieBannerBeDisplayed - Indicates whether the Wisdom component is present.
 * @property {setUserAcceptedCookiePolicy} setUserAcceptedCookiePolicy(acceptanceLevel) - Indicates whether the Wisdom component is present.
 */
 
/**
 * Defra Cookie Policy Manager
 * @param {Document} document The browsers document dom.  
 * @returns {CookiePolicyManager} The public function to interact with the plugin
 */
 function cookiePolicyManager(document) {

    /**
     * @typedef {defaults} defaults
     * @property {number} latestCookiePolicyVersion This is the latest cookie policy version number.
     * @property {string} userAcceptanceVersionName This is the name of the cookie that holds the users currently accepted cookie version number.
     * @property {string} userAcceptanceLevelCookieName This is the name of the cookie that holds the users currently accepted acceptance level.
     */
    var defaults = {
        latestCookiePolicyVersion: 1,
        userAcceptanceVersionName: "defra-cookie-acceptance-version",
        userAcceptanceLevelCookieName: "defra-cookie-acceptance-level",
        useBannerDismissed: "defra-cookie-banner-dismissed",
        domain:".environment-test.data.gov.uk" // This is the domain name that the cookie should be applied against.
    }

    /**
     * Processes the cookies that is stored in the browser.
     * @returns {Array<string>} Returns a key value array of the found cookies.
     */
    function parseCookies() {
        var cookies = [];
        document.cookie
            .split(';')
            .forEach(item => {
                var itemSplit = item.trim().split('=');
                var key = (itemSplit[0] && itemSplit[0].length > 0 ? itemSplit[0].trim() : '');
                var value = (itemSplit[1] && itemSplit[1].length > 0 ? itemSplit[1].trim() : '')
                cookies[key] = value;
            });

        return cookies;
    };

    /**
     * Check to see if a cookie with the provided cookie name is available.
     * @param {string} name The name of the cookie to check.
     * @returns {boolean} Returns a value indicating if a cookie was found with the provided name.
     */
    function exists(name) {

        var cookies = parseCookies();
        
        name = encodeURIComponent(name);
        
        return cookies[name] != undefined;
    };

    /**
     * Gets the cookie value of the provided cookie name.
     * @param {string} name The name of the cookie.
     * @returns {string} the value of the requested cookie.
     */
    function read(name) {

        name = encodeURIComponent(name);

        if (!exists(name)) {
            return undefined;
        }
        
        var cookies = parseCookies();
        return cookies[name];
    };

    /**
     * expiresOptions
     * @typedef {object} expiresOptions 
     * @property {number | Date} expires the number of days or the date when the cookie should expire
     * @property {string} path path The path the cookie is set to
     * @property {string} domain domain The domain to set the cookie against
     * @property {boolean} secure secure If the cookie is to be set against https
     * @property {'Lax'|'None'|'Strict'} sameSite 
     */

    /**
     * Saves the cookie to the users browser.
     * @param {string} name The name of the cookie
     * @param {string} value The cookie content
     * @param {(expiresOptions | number | Date)} expiresOrOptions The options or number of days that the cookie is valid for
     * @param {string} path The path the cookie is set to
     * @param {string} domain The domain to set the cookie against
     * @param {boolean} secure If the cookie is to be set against https
     * @param {'Lax'|'None'|'Strict'} sameSite
     * @returns {void}
     */
    function write(name, value, expiresOrOptions, path, domain, secure, sameSite) {
        
        if (typeof expiresOrOptions === 'number' || expiresOrOptions instanceof Date || path || domain || secure || sameSite) {
            var optionsBody = {
                expires: expiresOrOptions,
                path: path,
                domain: domain,
                secure: secure,
                sameSite: sameSite ? sameSite : 'Lax',
            };

            write(name, value, optionsBody);
            return;
        }

        var cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
        var options = expiresOrOptions ? expiresOrOptions : {};
        
        if (options.expires) {
            if (typeof options.expires === 'number') {
                var dateExpires = new Date(new Date().getTime() + options.expires * 1000 * 60 * 60 * 24);
                cookieString += 'expires=' + dateExpires.toUTCString() + ';';
            }
            else {
                cookieString += 'expires=' + options.expires.toUTCString() + ';';
            }
        }
        
        if (options.path) {
            cookieString += 'path=' + options.path + ';';
        }
        
        if (options.domain) {
            cookieString += 'domain=' + options.domain + ';';
        }
        
        if (options.secure === false && options.sameSite === 'None') {
            options.secure = true;
        }
        
        if (options.secure) {
            cookieString += 'secure;';
        }
        
        if (!options.sameSite) {
            options.sameSite = 'Lax';
        }
        
        cookieString += 'sameSite=' + options.sameSite + ';';
        document.cookie = cookieString;
    };

    /**
     * Remove the requested cookie from the users device.
     * @param {string} name The name of the cookie to remove
     * @param {string} path The path the cookie is set against
     * @param {string} domain The domain the cookie is set against
     * @param {boolean} secure https
     * @param {'Lax'|'None'|'Strict'} sameSite
     * @returns {void}
     */
    function remove(name, path, domain, secure, sameSite) {
        
        if (sameSite === void 0) { sameSite = 'Lax'; }
        
        var expiresDate = new Date('Thu, 01 Jan 1970 00:00:01 GMT');
        
        write(name, '', { expires: expiresDate, path: path, domain: domain, secure: secure, sameSite: sameSite });
    };
    
    /**
     * Gets the users accepted cookie policy version number.
     * @returns {number | undefined} The number indicating the users accepted cookie policy version or undefined if invalid.
     */
    function getUserAcceptedCookiePolicyVersion() {
        
        var result = read(defaults.userAcceptanceVersionName);
        
        if (result == undefined) {
            return undefined;
        }

        var parsedResult = parseInt(result);
        return parsedResult;
    }

    /**
     * This deletes the users acceptance cookies to force a re-approval.
     * @returns {void}
     */
    function deleteUserAcceptedVersion() {
        remove(defaults.userAcceptanceVersionName, '/', defaults.domain, true, 'Lax');
        remove(defaults.userAcceptanceLevelCookieName, '/', defaults.domain, true, 'Lax');
        remove(defaults.useBannerDismissed, '/', defaults.domain, true, 'Lax');
    }

    /**
     * This set's the users cookie acceptance level
     * @param {boolean | string} acceptanceLevel This is a boolean to indicate if the user accepted all cookies.
     * @returns {void}
     */
    function setUserAcceptedCookiePolicy(acceptanceLevel) {
        write(defaults.userAcceptanceVersionName, defaults.latestCookiePolicyVersion, 365, '/', defaults.domain, true, 'Lax');
        write(defaults.userAcceptanceLevelCookieName, acceptanceLevel, 365, '/', defaults.domain, true, 'Lax');
    }
    
    /**
     * This gets the users current acceptance level
     * @returns {string} This is the currently accepted cookie level.
     * true = User has accepted all cookies
     * false = user has accepted essential cookies only
     */
    function getUserAcceptedLevel() {
        return read(defaults.userAcceptanceLevelCookieName)
    }

    /**
     * Check the stored cookie version number against the system's cookie version number.
     * @returns {boolean} The status to indicate if the version numbers match.
     */
    function doesCookiePolicyVersionNumbersMatch() {
        var result = getUserAcceptedCookiePolicyVersion();
        return result && result == defaults.latestCookiePolicyVersion;
    }

    /**
     * This is to check if the cookie banner should be shown to the user.
     * @returns {boolean} A boolean status to indicate if the banner should be shown.
     */
    function shouldCookieBannerBeDisplayed() {
        return !doesCookiePolicyVersionNumbersMatch();
    }

    /**
     * This is to check if users currently accepted cookie version matches tha latest version
     * and performs the required actions.
     * @returns {void}
     */
    function checkUsersCookieAcceptanceVersion() {
        if (!doesCookiePolicyVersionNumbersMatch()) {
            deleteUserAcceptedVersion();
        }
    }

    checkUsersCookieAcceptanceVersion();

    return {
        getUserAcceptedCookiePolicyVersion: getUserAcceptedCookiePolicyVersion,
        getUserAcceptedCookiePolicyLevel: getUserAcceptedLevel,
        setUserCookiePolicy: setUserAcceptedCookiePolicy,
        checkUsersCookieAcceptanceVersion: checkUsersCookieAcceptanceVersion,
        shouldCookieBannerBeDisplayed: shouldCookieBannerBeDisplayed
    }
};

var cookiePolicy = cookiePolicyManager(document);
