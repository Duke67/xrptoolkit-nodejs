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

var warp = require('ripplewarpwallet');
var ProgressBar = require('progress');


if (process.argv.length < 3) {
  console.log('Must supply warp password and optional salt. ' + (DEFAULT_SALT === null ? '' : 'Default salt is set to: ' + DEFAULT_SALT));
  return 0;
} else if (DEFAULT_SALT === null && process.argv.length < 4) {
  console.log('!!!WARNING! Proceeding without salt!!!');
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
  console.log('Ripple Address : ' + res.address);
  console.log('Ripple Secret : ' + res.secret);
  console.log('///// ADVANCED /////');
  console.log('Raw Private Key : ' + res.privateKey);
  console.log('Raw Public Key : ' + res.publicKey);
}

warp(params, done);

///////////////////////////////////////////////////////////

