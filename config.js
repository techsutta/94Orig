var config = {
    development: {
        telegramToken: null,
       
        port: 3000,
     
        url: 'http://127.0.0.1:3000/',
        deepSite: null,
  
    },
    production: {
        telegramToken: process.env.telegramToken,
        insEmail: process.env.insEmail,
        insPass: process.env.insPass,
        port: process.env.PORT,
        insCookies: process.env.insCookies,
        url: process.env.url,
        deepSite: process.env.deepSite,
        lineAccessToken: process.env.lineAccessToken,
        lineSecret: process.env.lineSecret,
        twitterToken: process.env.twitterToken
    }
}

if (process.env.NODE_ENV != 'production') {
    config.development['telegramToken'] = require('./cred.js').telegramToken;
    config.development['insEmail'] = ('./cred.js').insEmail;
    config.development['insPass'] = ('./cred.js').insPass;
    config.development['insCookies'] = ('./cred.js').insCookies;
    config.development['deepSite'] = require('./cred.js').deepSite;
    config.development['lineAccessToken'] = ('./cred.js').lineAccessToken;
    config.development['lineSecret'] = ('./cred.js').lineSecret;
    config.development['twitterToken'] = ('./cred.js').twitterToken;
}

module.exports = config;
