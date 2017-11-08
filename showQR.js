///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2017 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// showQR.js - generate a QR code for provided text 
// syntax: node showQR [TEXT]
//
///////////////////////////////////////////////////////////

'use strict';

var express = require('express');
var qrcode = require('qrcode');
var launcher = require('launch-browser');

var txt = "USE_A_REAL_TEXT_STRING";

if(process.argv.length > 2) {
	txt = process.argv[2];
}

console.log('Source Text : ' + txt);

///////////////////////////////////////////////////////////

var app = express();

app.get('/', function(req, res) {

	res.writeHead(200, { 'Content-Type': 'text/html' });

	// display it in a web browser
	var html = "<!DOCTYPE html/><html>";
	html += "<head><title>XRPtoolkit by Duke67</title></head><body>";
	html += "<style type='text/css'>div{ padding:10px; }.inline { float:left; }.clearBoth { clear:both; }</style>";

	html += "<div>XRPtoolkit by Duke67</div>";
	html += "<div>QR code generator</div>";

	var opts = {
	  errorCorrectionLevel: 'H',
	  type: 'image/png',
		scale: 10
	};

	// generate QR code of a text string
	qrcode.toDataURL(txt, opts, function (err, url1) {

		// display it in the web browser
		html += "<div class='inline'>";
		html += "Source Text : ";
		html += txt + "<br />";
		html += "<img src='" + url1 + "'/> <br />";
		html += "</div>";

		html += "</body></html>";
		
		res.end(html);

	});


});

//console.log('To see the QR code, point your web browser to http://localhost:3000/');
console.log('Press Ctrl+C to quit this script.');

app.listen(3000);

launcher('http://localhost:3000/', { browser: ['chrome', 'firefox', 'safari'] }, function(e, browser){
	if(e) return console.log(e);
});

///////////////////////////////////////////////////////////

