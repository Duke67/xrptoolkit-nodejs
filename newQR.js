///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2017 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// new.js - creates new Ripple account and shows its QR codes
// syntax: node new
//
///////////////////////////////////////////////////////////

'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;

var express = require('express');
var qrcode = require('qrcode');
var open = require('open');

var api = new RippleAPI();

///////////////////////////////////////////////////////////

var app = express();

app.get('/', function(req, res) {

	res.writeHead(200, { 'Content-Type': 'text/html' });

	// generate new Ripple Account
	var ra = api.generateAddress();
	var acnt = ra.address.toString();
	var scrt = ra.secret.toString();

	//console.log('Ripple Account : ' + acnt);
	//console.log('Ripple Secret : go to http://localhost:3000/ and click "Reveal" button');


	// display it in a web browser
	var html = "<!DOCTYPE html/><html>";
	html += "<head><title>XRPtoolkit by Duke67</title></head><body>";
	html += "<style type='text/css'>div{ padding:10px; }.inline { float:left; }.clearBoth { clear:both; }</style>";

	html += "<div>XRPtoolkit by Duke67</div>";
	html += "<div>New Ripple Account has been generated</div>";

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
	});

	// generate QR code of Ripple Secret (private)
	opts.color.dark = '#F00';	// show Ripple secret in RED
	opts.scale = 5;			// make Ripple secret SMALLER than account
	qrcode.toDataURL(scrt, opts, function (err2, url2) {

		// display it in the web browser
		html += "<div class='inline'>";
		html += "Ripple Secret: <br /><br />";

		// include script to display Ripple Secret (initially hidden for security purposes)
		html += "<script type='text/javascript'>function toggle_vis() { "
		html += "document.getElementById('xrpscrt').style.visibility = 'visible'; document.getElementById('tglbtn').style.visibility = 'hidden'; "
		html += "} </script>"

		// Reveal button
		html += "<input id='tglbtn' type='button' onclick='toggle_vis();' value='Reveal' />";

		html += "<div id='xrpscrt' style='visibility: hidden'>";
		html += scrt + "<br />";
		html += "<img src='" + url2 + "'/><br />";
		html += "</div>";

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
