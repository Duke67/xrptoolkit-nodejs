///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2017 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// new_simple.js - creates new Ripple account
// syntax: node new_simple
//
///////////////////////////////////////////////////////////

'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;

var api = new RippleAPI();

///////////////////////////////////////////////////////////

// generate new Ripple Account
var ra = api.generateAddress();
var acnt = ra.address.toString();
var scrt = ra.secret.toString();

console.log('Ripple Account : ' + acnt);
console.log('Ripple Secret : ' + scrt);

///////////////////////////////////////////////////////////
