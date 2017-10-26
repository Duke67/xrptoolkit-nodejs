///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2017 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// showQR.js - shows Ripple address as a QR code
// syntax: node showQR [ACCOUNT]
//
///////////////////////////////////////////////////////////

'use strict';

var express = require('express');
var qrcode = require('qrcode');
var open = require('open');

var acnt = "raakAtsGGZGGs8xb8AxDEUyWj7UxNGHGb7";	// use your own data here

if(process.argv.length > 2) {
	acnt = process.argv[2];
}

console.log('Ripple Account : ' + acnt);

///////////////////////////////////////////////////////////

var app = express();

app.get('/', function(req, res) {

	res.writeHead(200, { 'Content-Type': 'text/html' });

	// display it in a web browser
	var html = "<!DOCTYPE html/><html>";
	html += "<head><title>XRPtoolkit by Duke67</title></head><body>";
	html += "<style type='text/css'>div{ padding:10px; }.inline { float:left; }.clearBoth { clear:both; }</style>";

	html += "<div>XRPtoolkit by Duke67</div>";
	html += "<div>Ripple Account's QR code</div>";

	var opts = {
	  errorCorrectionLevel: 'H',
	  type: 'image/png',
		scale: 10
	};

	// generate QR code of Ripple Address (public)
	qrcode.toDataURL(acnt, opts, function (err, url1) {

		// display it in the web browser
		html += "<div class='inline'>";
		html += "Ripple Account: <br /><br />";
		html += acnt + "<br />";
		html += "<img src='" + url1 + "'/> <br />";
		html += "</div>";

		html += "</body></html>";
		
		res.end(html);

	});


});

//console.log('To see the QR code, point your web browser to http://localhost:3000/');
console.log('Press Ctrl+C to quit this script.');

app.listen(3000);

open('http://localhost:3000/');

///////////////////////////////////////////////////////////

