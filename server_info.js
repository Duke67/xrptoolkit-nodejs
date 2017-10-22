///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2017 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// server_info.js - shows server's state info 
// syntax: node server_info [RCL|TEST]
//
// HINT - see "validatedLedger"."ledgerVersion" to determine 
// maximum ledger when signing payment offline
//
///////////////////////////////////////////////////////////

'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;

///////////////////////////////////////////////////////////

var api;
var net = process.argv[2];

if (net == 'TEST') {
    api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' });
} else {
    api = new RippleAPI({ server: 'wss://s1.ripple.com:443' });
}

///////////////////////////////////////////////////////////

var acnt = process.argv[3];

console.log('XRPtk-nodejs: server_info ');

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

function getState(){
   return api.getServerInfo().then(info => {
        //balance = info.xrpBalance;
        //console.log(info.xrpBalance);
        return info;
   });
}

///////////////////////////////////////////////////////////

api.connect().then(() => {

	return getState();

}).then(info => {

	console.log('Server info :' + JSON.stringify(info, null, 2));

}).then(() => {

	return api.disconnect();

}).catch(console.error);

///////////////////////////////////////////////////////////
