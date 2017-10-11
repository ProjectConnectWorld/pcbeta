// import config from '../config.js';
var config = require('../config.js')
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
const Request = require('superagent');

var acToken = "KE0GE1Zg1hPaE6AR";
const magicbox_url = config.magicbox_url;
const refreshToken = config.refreshToken;
const rfUrl = config.rfUrl;

console.log("IN SCHOOLS.JS");

function getResponse(url, token, res) {
  Request
    .get(url)
    .set('Token', 'Bearer ' + token)
    .retry(2)
    .end(function(err, resp) {
      if (err || !resp.ok) {
        console.log('Oh no! error. Getting new Token');
        getNewToken(rfUrl, refreshToken);
        getResponseError(url, acToken, res);
      } else {
        console.log('yay got ' + JSON.parse(resp.text));
        res.json(JSON.parse(resp.text));
      }
    });
}

function getResponseError(url, token, res) {
  Request
    .get(url)
    .set('Token', 'Bearer ' + token)
    .retry(2)
    .end(function(err, resp) {
      if (err || !resp.ok) {
        console.log(token);
        console.log('Error with new token');
      } else {
        console.log('yay got ' + JSON.parse(resp.text));
        res.json(JSON.parse(resp.text));
      }
    });
}

function getNewToken(url, rfToken) {
  Request
    .get(url + rfToken)
    .end(function(err, resp) {
      if (err || !resp.ok) {
        console.log('Oh no! error');
      } else {
        acToken = JSON.parse(resp.text)["access_token"];
        console.log(acToken);
      }
    });

}

const forward_get = (req, res, next) => {
  console.log("FORWARD_GET");
  console.log(magicbox_url);
  console.log(req.originalUrl);
  const url = `${magicbox_url}${req.originalUrl}`
  console.info(`FORWARD GET: magicbox ${url}`)
  getResponse(url, acToken, res);
}

/* GET users listing. */
router.get('/countries/:country', forward_get);

module.exports = router;
