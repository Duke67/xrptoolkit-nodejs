///////////////////////////////////////////////////////////
//
// Duke67 XRPtoolkit
// (C) 2017 Duke67 (MrDuke67@outlook.com)
// https://github.com/Duke67/xrptoolkit-nodejs
//
// warp2account.js - extracts ripple account secret and address from
// RippleWarpWallet password and salt.
//
// syntax: node warp2account [PASSWORD] [SALT]
//
// HINT - default salt can be set in the file to make the salt argument optional
//
///////////////////////////////////////////////////////////

'use strict';

// HINT - Change this to your email address or whatever other salt
// you would like to use so you don't have to type it in to the
// command line every time.
var DEFAULT_SALT = null;

var express = require('express');
var qrcode = require('qrcode');
var launcher = require('launch-browser');
var warp = require('ripplewarpwallet');
var ProgressBar = require('progress');

if (DEFAULT_SALT === null && process.argv.length < 4) {
  console.log('!!!WARNING! Proceeding without salt!!!');
} else if (process.argv.length < 3) {
  console.log('Must supply warp password and optional salt. ' + DEFAULT_SALT === null ? '' : 'Default salt is set to: ' + DEFAULT_SALT);
}

var password = process.argv[2];
var salt = DEFAULT_SALT
if (salt === null) {
	if (process.argv.length > 3) {
		salt = process.argv[3];
	} else {
		salt = '';
	}
  console.log('Proceeding with password "' + password + '" and salt "' + salt + '".');
} else {
  console.log('Proceeding with password "' + password + '" and default salt "' + salt + '".');
}

const params = {
    passphrase : password,
    salt : salt,
    progress_hook : logOutput
};

var startedScrypt = false;
var startedPbkdf2 = false;
var scryptBar;
var pbkdf2Bar;
var lastProgress = 0;
function logOutput(progress) {
  if (progress.what === 'scrypt') {
    if (startedScrypt) {
      scryptBar.tick(progress.i - lastProgress);
      lastProgress = progress.i;
      if (lastProgress === progress.total) {
        lastProgress = 0;
      }
    } else {
      scryptBar = new ProgressBar('Scrypt: [:bar] :percent', {
        complete: '#',
        incomplete: ' ',
        total: 524288
      });
      startedScrypt = true;
    }
  }
  if (progress.what === 'pbkdf2') {
    if (startedPbkdf2) {
      pbkdf2Bar.tick(progress.i - lastProgress);
      lastProgress = progress.i;
      if (lastProgress === progress.total) {
        lastProgress = 0;
      }
    } else {
      pbkdf2Bar = new ProgressBar('PBKDF2: [:bar] :percent', {
        complete: '#',
        incomplete: ' ',
        total: 65536
      });
      startedPbkdf2 = true;
    }
  }
}

function done(res) {
	var acnt = res.address;
	var scrt = res.secret;
  console.log('Ripple Address : ' + res.address);
  console.log('Ripple Secret : ' + res.secret);
  console.log('///// ADVANCED /////');
  console.log('Raw Private Key : ' + res.privateKey);
	console.log('Raw Public Key : ' + res.publicKey);
	display(scrt, acnt);
}

warp(params, done);

///////////////////////////////////////////////////////////

function display(scrt, acnt) {
	var app = express();

	app.get('/', function(req, res) {

		res.writeHead(200, { 'Content-Type': 'text/html' });

		// display it in a web browser
		var html = "<!DOCTYPE html/><html>";
		html += "<head><title>XRPtoolkit by Duke67</title></head><body>";
		html += "<style type='text/css'>div{ padding:10px; }.inline { float:left; }.clearBoth { clear:both; }</style>";

		html += "<div>XRPtoolkit by Duke67</div>";
		html += "<div>RippleWarpWallet by termhn</div>";
		html += "<div>Ripple Account was extracted:</div>";

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

	launcher('http://localhost:3000/', { browser: ['chrome', 'firefox', 'safari'] }, function(e, browser){
		if(e) return console.log(e);
	});
}

///////////////////////////////////////////////////////////

