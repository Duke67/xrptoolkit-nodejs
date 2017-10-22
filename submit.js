///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2017 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// submit.js - submits signed transaction to Ripple network 
// syntax: node submit [RCL|TEST] SIGNED_TX
//
///////////////////////////////////////////////////////////

'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;

///////////////////////////////////////////////////////////

var api;
var net = process.argv[2];
var signedTx = 'NULL';

if (net == 'TEST') {
    api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' });
} else {
    api = new RippleAPI({ server: 'wss://s1.ripple.com:443' });
}

///////////////////////////////////////////////////////////
	
signedTx = process.argv[3];

console.log('XRPtk-nodejs: submit ' + signedTx);

///////////////////////////////////////////////////////////

api.on('connected', () => {
	process.exitCode = 1;
	console.log('connected');
});
api.on('disconnected', (code) => {
	console.log('disconnected, code:', code);
});
api.on('error', (errorCode, errorMessage) => {
	console.log(errorCode + ': ' + errorMessage);
});

///////////////////////////////////////////////////////////

function quit(message) {
	return api.disconnect();
	console.log(message);
	process.exit(0);
}

function fail(message) {
	return api.disconnect();
	console.error(message);
	process.exit(1);
}

///////////////////////////////////////////////////////////

api.connect().then(() => {

    api.submit(signedTx).then(quit, fail);
  
}).catch(fail);

///////////////////////////////////////////////////////////
