///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2017 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// sign.js - 	signs XRP payment offline and displays 
//		signed transaction blob in a QR code
// syntax: node sign SRC SECRET SEQ DST DSTTAG AMOUNT MAXLEDGER
//
///////////////////////////////////////////////////////////

'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;

var express = require('express');
var qrcode = require('qrcode');
var open = require('open');

var api = new RippleAPI();

///
/// HINT
/// 1. use editor to preset the following variables with your data
/// 2. create custom copies of this script for frequent payments
///

var src = 'raakAtsGGZGGs8xb8AxDEUyWj7UxNGHGb7';		// source account
var dst = 'rGNLJ5VLZWKt7RrQrbyUZjXa2mCCcEenpu';		// destination account
var tag = '123';					// destination tag (can be ignored if not rquired by receipent)
var scrt = 'shkJ3HM8jcrKvpYAifJhwvkaGDEtm';		// source account's secret 

var amnt = '1000000';					// payment amount in XRP drops (1,000,000 drops = 1 XRP)
var ccy = 'XRP';					// currency (only XRP is supported for now)
var lgr = 35000000;					// maximum ledger
var seq = 1;						// source account's sequence (to get this info, use XRPtoolkit-Android or account_info.js)   
var fee = 12;						// fee (default is 12 drops, can be increased if necessary)

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

var app = express();

app.get('/', function(req, res) {

	res.writeHead(200, { 'Content-Type': 'text/html' });

	console.log();
	console.log(rawTx);

	var signedTx = api.sign(rawTx, scrt);

	console.log();
	console.log('SIGNED TX:');
	console.log();
	console.log(signedTx.signedTransaction);
	console.log();


	var html = "<!DOCTYPE html/><html>";
	html += "<head><title>XRPtoolkit by Duke67</title></head><body>";
	html += "<style type='text/css'>div{ padding:10px; }.inline { float:left; }.clearBoth { clear:both; }</style>";
	html += "<style type='text/css'>span { display:block; width:500px; word-wrap:break-word; }</style>";

	html += "<div>";
	html += "XRPtoolkit by Duke67";
	html += "</div>";

	html += "<div>";
	html += "Ripple Payment was signed"; 
	html += "</div>";

	html += "<div>";
	html += "Source Account: " + src + "<br />";
	html += "Source Account Sequence: " + seq + "<br />";
	html += "Max Ledger: " + lgr + "<br />";
	html += "</div>";

	html += "<div>";
	html += "Destination Account: " + dst + "<br />";
	html += "Destination Tag: " + tag + "<br />";
	html += "</div>";

	html += "<div>";
	html += "Amount: ";
	html += amnt + "<br />";
	html += "Fee: ";
	html += fee + "<br />";
	html += "</div>";

	var opts = {
	  errorCorrectionLevel: 'H',
	  type: 'image/png',
		scale: 5
	};

	html += "<hr>";

	qrcode.toDataURL(signedTx.signedTransaction, opts, function (err2, url) {
		html += "<div>";
		html += "Signed Transaction<br />";
		html += "</div>";

		html += "<div class='inline'>";
		html += "QR code: <br />";
		html += "<img src='" + url + "'/><br />";
		html += "</div>";

		html += "<div class='inline'>";
		html += "Blob: <br /><br />";
		html += "<span>";
		html += signedTx.signedTransaction;
		html += "</span>";
		html += "</div>";

		html += "</body></html>";
		
		res.end(html);
	});


});

app.listen(3000);

open('http://localhost:3000/');

//console.log('To see the QR code, point your web browser to http://localhost:3000/');
console.log('Press Ctrl+C to quit this script.');

///////////////////////////////////////////////////////////

