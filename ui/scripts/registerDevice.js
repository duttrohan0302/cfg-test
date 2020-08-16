function registerDevice() {
  console.log("Registering");
  if (readCookie("PatialaCity_DeviceAuth")!=null) {
    // Device is already registered...
    updateUserData();
  }else {
    // Device is new
    var api_URL = 'https://captain.patiala.city/api/auth.php';
    var module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function () {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);

            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version;

            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                    matches = string.match(regexv);
                    version = '';
                    if (matches) { if (matches[1]) { matches = matches[1]; } }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.';
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = '0';
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        }
    };
    var e = module.init();
    fullName = getLocalStorage('UserInputName');
    phonenumber = getLocalStorage('UserInputPhone');
    email = getLocalStorage('UserInputEmail');
    $.ajax({
        type: 'POST',
        crossDomain: true,
        url: api_URL,
        data: {
          'data': 'RegisterDevice',
          'fullName': fullName,
          'phoneNumber': phonenumber,
          'emailAddress': email,
          'userOSName': e.os.name,
          'userOSVersion': e.os.version,
          'userBrowserName': e.browser.name,
          'userBrowserVersion': e.browser.version,
          'navigatorPlatform': navigator.platform,
          'navigatorVendor': navigator.vendor,
          'navigatorAppVersion': navigator.appVersion,
          'navigatorUserAgent': navigator.userAgent
        },
        success: function(data) {
          data = JSON.parse(data);
          var o = new Date;
          var t = o.setTime(o.getTime() + 24 * 3 * 60 * 60 * 1e3); // 3 days ahead of time
          createCookie("PatialaCity_DeviceAuth", data, 30);
          createCookie("PatialaCity_DeviceAuth_Check", t, 3);
          //localStorage.setItem('UserAuthToken', data);
        }
      });
  }
}
