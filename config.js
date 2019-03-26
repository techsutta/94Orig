var config = {
  development: {
    telegramToken: null,
    insEmail: 'leofddt@gmail.com',
    insPass: null,
    port: 3000,
    insCookies: null,
    url: 'http://127.0.0.1:3000/'
  },
  production: {
    telegramToken: process.env.telegramToken,
    insEmail: 'sanaingress@gmail.com',
    insPass: process.env.insPass,
    port: process.env.PORT,
    insCookies: process.env.insCookies,
    url: 'https://origin94origin.herokuapp.com/'
  }
}

if (process.env.NODE_ENV != 'production') {
  config.development['telegramToken'] = require('./cred.js').telegramToken;
  config.development['insPass'] = require('./cred.js').insPass;
  config.development['insCookies'] = require('./cred.js').insCookies;
}

module.exports = config;
