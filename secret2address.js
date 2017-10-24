///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2017 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// secret2address.js - extracts full Ripple address from secret
// syntax: node secret2address [SECRET]
//
// HINT - if not secret is provided, it generates new Ripple account
//
///////////////////////////////////////////////////////////

'use strict';

var keypairs = require('ripple-keypairs');

var scrt = (process.argv.length > 2) ? process.argv[2] : keypairs.generateSeed();

var pair = keypairs.deriveKeypair(scrt);
var acnt = keypairs.deriveAddress(pair.publicKey)

console.log('Ripple Account : ' + acnt);
console.log('Ripple Secret : ' + scrt);

///////////////////////////////////////////////////////////

