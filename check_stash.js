///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2017 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// check_stash.js - check balance of several Ripple accounts at once
// syntax: node check_stash
//
///////////////////////////////////////////////////////////

'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({server: 'wss://s1.ripple.com:443'});
//const api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' });


///
/// HINT - use text editor to preset the following array with your data
///

var accounts = [ 
'rhT2zX6SqTycCnGfGLKBBjVnvWmuyGFb7A',
'radkxo6zoVUyYt2NfRFSnELWnxbHUuuyBp',
'r9ZWnxoJajbnyL1W73uYkQbztrwf3qRBTt'
];

///

api.on('connected', () => {
	console.log('connected');
});
api.on('disconnected', (code) => {
	console.log('disconnected, code:', code);
});
api.on('error', (errorCode, errorMessage) => {
	console.log(errorCode + ': ' + errorMessage);
});

///

api.connect().then(() => {

	console.log('Account queried...');

	for (var i = 0; i < accounts.length; i++) {

		var acnt = accounts[i];
		console.log('Account : ' + acnt);
		
		api.getBalances(acnt).then(balances => {
		    console.log(JSON.stringify(balances, null, 2));
		});

	}

}).then(() => {

	console.log('Balance is coming now...');

}).then(() => {

	api.disconnect();

}).catch(console.error);

///////////////////////////////////////////////////////////

