///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2020 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// delete.js - delete XRP account
// syntax: node delete [XRPL|TEST] ACCOUNT SECRET SEQ DST DSTTAG
//
///////////////////////////////////////////////////////////

'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;

var api;
var net = process.argv[2];


if (net == 'TEST') {
    api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233', maxFeeXRP: '5' });
} else {
    api = new RippleAPI({ server: 'wss://s1.ripple.com:443', maxFeeXRP: '5' });
}



///
/// HINT
/// 1. use editor to preset the following variables with your data
/// 2. create custom copies of this script for frequent payments
///

var src = 'rHqaHPMmdWWSv2EmXGDwXmtgnC5hXR5zUy';	// account to be deleted
var dst = 'r4qSyg6j77me6seoBEDKXF3tueFiZtP5t2';	// destination account
var tag = '123';					// destination tag 
var scrt = 'spvdQ8sHG6wCP7K7nGHGUpe4LLFkq';		// source account's secret 

var seq = 1;						// source account's sequence (to get this info, use XRPtoolkit-Android or account_info.js)   
var fee = 5000000;					// fee (default is 5 XRPs (5000000 drops)

///

process.argv.forEach(function (val, index, array) {

	console.log(index + ': ' + val);

	switch(index) {
	case 2:net = val;break;
	case 3:src = val;break;
	case 4:scrt = val;break;
	case 5:seq = val;break;
	case 6:dst = val;break;
	case 7:tag = val;break;
	default:break;
	}

});

///////////////////////////////////////////////////////////

var rawTx = '{"TransactionType":"AccountDelete",' +
'"Account":"' + src +
'","Destination":"' + dst +
'","DestinationTag":' + tag +
',"Fee":"' + fee +
'","Sequence":' + seq +
',"Flags":2147483648' + 
'}';

///////////////////////////////////////////////////////////

console.log();
console.log(rawTx);

api.connect().then(() => {

	console.log('WORKING:');

	var sgnd = api.sign(rawTx, scrt).signedTransaction;
    	console.log(sgnd);
    
        api.submit(sgnd).then( response => {
		console.log('RESPONSE:');
		console.log(response.resultCode, response.resultMessage);
        }).catch(console.error)
    
}).then(() => {

	console.log('AccountDelete is being processed by XRPL...');

}).then(() => {

	api.disconnect();

}).catch(console.error);

console.log();

///////////////////////////////////////////////////////////

