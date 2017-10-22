///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2017 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// sign_simple.js - signs XRP payment offline
// syntax: node sign SRC SECRET SEQ DST DSTTAG AMOUNT MAXLEDGER
//
///////////////////////////////////////////////////////////

'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;

var api = new RippleAPI();

///
/// HINT
/// 1. use editor to preset the following variables with your data
/// 2. create custom copies of this script for frequent payments
///

var src = 'raakAtsGGZGGs8xb8AxDEUyWj7UxNGHGb7';		// source account
var dst = 'rGNLJ5VLZWKt7RrQrbyUZjXa2mCCcEenpu';		// destination account
var tag = '123';					// destination tag 
var scrt = 'shkJ3HM8jcrKvpYAifJhwvkaGDEtm';		// source account's secret 

var amnt = '1000000';					// payment amount in XRP drops (1,000,000 drops = 1 XRP)
var ccy = 'XRP';					// currency (only XRP is supported for now)
var lgr = 35000000;					// maximum ledger
var seq = 1;						// source account's sequence (to get this info, use XRPtoolkit-Android or account_info.js)   
var fee = 12;						// fee (default is 12 drops, can be increased)

///

var rawTx = '{"TransactionType":"Payment","Account":"' + src +
'","Destination":"' + dst +
'","DestinationTag":"' + tag +
'","Amount":"' + amnt +
'","Flags":2147483648,' + 
'"LastLedgerSequence":' + lgr +
',"Fee":"' + fee +
'","Sequence":' + seq + '}';

///////////////////////////////////////////////////////////

process.argv.forEach(function (val, index, array) {

	//console.log(index + ': ' + val);

	switch(index) {
	case 2:src = val;break;
	case 3:scrt = val;break;
	case 4:seq = val;break;
	case 5:dst = val;break;
	case 6:tag = val;break;
	case 7:amnt = val;break;
	case 8:lgr = val;break;
	default:break;
	}

});

///////////////////////////////////////////////////////////

console.log();
console.log(rawTx);

var signedTx = api.sign(rawTx, scrt);

console.log();
console.log('SIGNED TX:');
console.log();
console.log(signedTx.signedTransaction);
console.log();

///////////////////////////////////////////////////////////

