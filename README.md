# xrptoolkit-nodejs

A toolkit for safe and secure access to XRP ledger (Ripple Network).

If used properly, these tools allow you to actively use your XRP assets, while keeping the highest possible level of safety and security


# Features
- Follows and levereges Ripple’s Reliable Transaction Submission
- Allows you to keep sensitive info (Ripple Secret) always offline and thus secure
- Maintains the air-gap between online and offline devices
- Connected device can only see encrypted data
- QR codes and OCR makes data transfers quick and convenient
- Avoids using USB devices
- Clean and compact code allows inspection by end-user, 3rd party or community


# Functionality
- Access to XRP ledger from:
  - Node.js (Linux, MacOS, Windows)
  - Android client (xrptoolkit-android)
  - iOS client (xrptoolkit-ios - planned)
- Monitor XRP ledger (ledger, accounts, balances, etc.)
- Securely create new accounts (offline)
- Securely sign payments (offline)
- Submit offline-signed transactions to XRP ledger


# Roadmap
- Support for other crypto currencies, fiat and IOUs
- Escrow
- Multi-sign
- iOS client for Apple iPhone


# Getting started
- [Ripple Developer Center](https://ripple.com/build/)
- [Ripple API Beginners Guide](https://ripple.com/build/rippleapi-beginners-guide/)
- [Reliable Transaction Submission](https://ripple.com/build/reliable-transaction-submission/)


# Installation (Online computer)

Install Dependencies

Install Node.js, if you haven't already.

Fork and clone the xrptoolkit-nodejs repository and run npm install.

Install ripple-lib and other dependencies using npm:

```
$ npm install ripple-lib
$ npm install express
$ npm install qrcode
$ npm install open
```
Test your installation:

```
$ node new
```

You should see something like this:

```
user@host:~/xrptoolkit-nodejs$ node new
Ripple Account : ryH1ckEKUm4yeLTziToAltWYtsrYSV4Po
Ripple Secret : ss467Gz1g5YikcCxHePFShkoZBPzr
user@host:~/xrptoolkit-nodejs$ 
```

Now test the QR version of the script to check if internal web server and QR code generation works:

```
$ node newQR
```

Now your web browser should open and display something like this:

![New Account with QR codes](newQRimg.jpg?raw=true "New Account with QR codes")


# Installation (Offline computer)
- Make a fresh Linux installation (Ubuntu 16+ or similar)
- Copy here complete “xrptoolkit-nodejs” folder including its subfolders from the online computer
- Never connect this computer to the Internet (i.e. disable WiFi in BIOS, or switch network button off)


# Configurations
- Linux (online) – Linux (offline)
- Android (online) – Linux (offline)
- Linux (online)


# Usage

Create New Account
```
$ node new
```
- You will see Ripple Account and Secret in console (terminal)
- Save to a secure location for future use
- Hint: Do some work before this, to give the OS a chance to collect some entropy. Never create accounts immediately after the system boots up!
      

Create New Account (QR code)
```
$ node newQR
```
- You will see Ripple Account and Secret in web browser
- Save text and QRcode images to a secure location for future use
- Hint: Do some work before this, to give the OS a chance to collect some entropy. Never create accounts immediately after the system boots up!
      

Check Account Information
```
$ node account_info [RCL|TEST] account
```
- Use RCL or TEST parameter to select production or test network
- You will see account’s Balance (in XRP, not drops) and Sequence in console

```
$ node account_info RCL rAAAAAAAAAAAAAAAAAAAAAAACNT 
Balance : 22500
Sequence: 7
```

Check Server Information
```
$ node server_info [RCL|TEST]
```
- Use RCL or TEST parameter to select production or test network
- You will see a complex JSON-formatted server information
- Hint: parameter "ledgerVersion" in section "validatedLedger" is used when signing offline transactions
      

Check Stash
```
$ node check_stash
```
- Use text editor to preset array of variables with your accounts list
- You will see accounts complete balances, including non-XRP assets
      

Sign Payment
```
$ node sign SRC SECRET SEQ DST DSTTAG AMOUNT MAXLEDGER
```
- Before signing payment offline, you will need to know:
  - source account
  - source account’s secret
  - source sequence (use Android client, or account_info)
  - destination address
  - destination tag (can be ignored, if not required by receipient)
  - maximum ledger (use Android client, or server_info and adjust accordingly)- 
- Payment amount is in drops (1,000,000 drops = 1 XRP)
      
- Hint 1: Use text editor to preset default variables with your own data
- Hint 2: You may want to create custom copies of this script for frequent payments
- Hint 3: New ledger is closed every 3-4 seconds. If you will need 1-2 minutes to submit this payment to live network, better add 20-50 or even more to what is reported by server_info.

- You will see JSON-formatted payment details and then signed transaction’s text blob
- Transfer signed transaction to online device (computer or Android client) for submission to Ripple network

```   
$node sign 

{"TransactionType":"Payment","Account":"raakAtsGGZGGs8xb8AxDEUyWj7UxNGHGb7",
"Destination":"rGNLJ5VLZWKt7RrQrbyUZjXa2mCCcEenpu","DestinationTag":"123",
"Amount":"1000000","Flags":2147483648,"LastLedgerSequence":35000000,
"Fee":"12","Sequence":1}

SIGNED TX:

120000228000000024000000012E0000007B201B02160EC06140000000000F424068400000000000000C7321022C
C705F4FEE39CEFE883FE86853EF866EF26764AC31362AAD37E6573F8CFE9E0744730450221009DD94CDA9A1D5308
3FF2C7EC8AFD7B67F932F4A70700427F011D537E8F9038A9022060160B51489138529EE4F5ABED739CC49F3AB60A
A6E5B8F1F66FE79C88282CA1811437EF64A707F99867C5E2B8DB5E902D9CD04158D28314A70F68DD4D41D95468A8
E61BC32DE25862F63CA

$
```

Sign Payment (QR code)
```
$ node signQR SRC SECRET SEQ DST DSTTAG AMOUNT MAXLEDGER
```
- Before signing payment offline, you will need to know:
  - source account
  - source account’s secret
  - source sequence (use Android client, or account_info)
  - destination address
  - destination tag (can be ignored, if not required by receipient)
  - maximum ledger (use Android client, or server_info and adjust accordingly)
- Payment amount is in drops (1,000,000 drops = 1 XRP)
      
- Hint 1: Use text editor to preset default variables with your own data
- Hint 2: You may want to create custom copies of this script for frequent payments
- Hint 3: New ledger is closed every 3-4 seconds. If you will need 1-2 minutes to submit this payment to live network, better add 20-50 or even more to what is reported by server_info.

- In a web browser you will see QR code and text blob representing signed transaction
- Use Android client QR feature to scan and instant submission to Ripple network


Submit
```
$ node submit [RCL|TEST] SIGNED_TX
```
- Use RCL or TEST parameter to select production or test network
- Use sign or signQR to generate SIGNED_TX blob
- You will see a preliminary information about submission
- Final information after validation by network can be achieved by monitoring the account or the transation


# Contact
- Follow [@MrDuke67 on twitter](https://twitter.com/MrDuke67)

# License
- (https://github.com/Duke67/xrptoolkit-nodejs/blob/master/LICENSE)
