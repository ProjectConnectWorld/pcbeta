var config = require('../config.js')
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var cache = require('memory-cache');

var acToken = "KE0GE1Zg1hPaE6AR"; //Initial  Access Token
const Request = require('superagent');
const magicbox_url = config.magicbox_url; // Magic box API rul
const refreshToken = config.refreshToken; // Permanent Refresh Token
const rfUrl = config.rfUrl; // Refresh Token URL





// If there is an error in getResponce this function is called to get a new Access token.
// This is done because the Access Token last only 24 hrs. If there is an error it means
// that the token is no longer valid, thus you need to use the refresh token to get a new one
function getNewToken(url, rfToken) {
  console.log("In getNT");
  Request
    .get(url + rfToken)
    .end(function(err, resp) {
      if (err || !resp.ok) {
        console.log('err getting new token');
      } else {
        console.log('HERE IS YOUR NEW Token');
        acToken = JSON.parse(resp.text)["access_token"];
        console.log("T: " + acToken);
      }
    });
}

// getResponseError simple recalls the same api request with the updated token
function getResponseError(url, token, res) {
  console.log("In getRE");
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
        cache.put(url, resp.text, 90000000);
        res.json(JSON.parse(resp.text));
      }
    });
}

// getResponse makes the API call
// if there is an error then it calls get a new token && redos the request with the new token
// If there is no erorr then it just outputs the response and adds it to the cache
// the cache stores it for 90000000ms ot 24hrs
function getResponse(url, token, res) {
  console.log("In GetR");
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
        cache.put(url, resp.text, 90000000);
        res.json(JSON.parse(resp.text));
      }
    });
}
// This function handles all request
// if the api call is in the cache then return it
// if not then it calls getResponse()
const forward_get = (req, res, next) => {
  console.log("FORWARD_GET");
  console.log(magicbox_url);
  console.log(req.originalUrl);
  const url = `${magicbox_url}${req.originalUrl}`
  console.info(`FORWARD GET: magicbox ${url}`)
  if (cache.get(url)) {
    console.log("FROM CACHE");
    var cachedResp = cache.get(url)
    res.json(JSON.parse(cachedResp))
  } else {
    console.log("FROM API");
    getResponse(url, acToken, res);
  }
}


// If the request is a schools request then it forwards the request to forward_get
/* GET users listing. */
router.get('/countries/:country', forward_get);

module.exports = router;
