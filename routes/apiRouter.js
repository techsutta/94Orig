const express = require('express');
const multer = require('multer');
const crawler = require('../crawler.js');
const router = express.Router();
const upload = multer();

var request = require('request');
var request = require('request').defaults({ jar: true });

router.use(function (req, res, next) {
  if (req.get('x-amz-sns-message-type')) {
    req.headers = 'application/json';
  }
  console.log(`${req}middleware test`)
  next();
});

router.post('/telegram', upload.array(), async function (req, res) {
  try {
    console.log(req.body.url)
    let result = await telegram(req.body.url);
    res.status(200).json({ url: `${result}` });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
    return error;
  }
});

router.post('/web', upload.array(), async function (req, res) {
  try{
    let result = await web(req.body.url);
    res.status(200).json({ url: `${result}` });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
    return error;
  }
});

router.post('/aws-test', upload.array(), function (req, res) {
  try {
    let msgBody = req.body
    console.log(msgBody)
    // request(body.SubscribeURL, function (error, response, body) {
    //   console.log(body)
    // });
    res.status(200).json({ url: `hi` });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
    return error;
  }
});

function telegram(urls) {
  return crawler.getImage(urls);
}

function web(url) {
  return crawler.getImage(urls);
}

module.exports = router;
