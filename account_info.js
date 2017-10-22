///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2017 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// account_info.js - displays account's basic info
// syntax: node account_info [RCL|TEST] ACCOUNT
//
// HINT - see Sequence to determine source account's 
// sequence, when signing payment offline
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

console.log('XRPtk-nodejs: account_info ' + acnt);

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

function getAccount(address){
   return api.getAccountInfo(address).then(info => {
        //balance = info.xrpBalance;
        //console.log(info.xrpBalance);
        return info;
   });
}

///////////////////////////////////////////////////////////

api.connect().then(() => {

 	return getAccount(acnt);

}).then(info => {

    console.log("Balance : " + info.xrpBalance);
    console.log("Sequence: " + info.sequence);

}).then(() => {

    return api.disconnect();

}).catch(console.error);

///////////////////////////////////////////////////////////
