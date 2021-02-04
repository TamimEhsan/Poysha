const { Blockchain, Transactions } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('e94b57f5ea4e8b3b0eaccf5d00281dc9ff58ada8c9d0752cbc807c4819d948f5');
const myWalletAddress = myKey.getPublic('hex');

let poysha = new Blockchain();

const tx1 = new Transactions(myWalletAddress,'public key goes here',10);
tx1.signTransaction(myKey);
poysha.addTransaction(tx1);


console.log("starting mining...");
poysha.minePendingTransaction(myWalletAddress);
console.log(`Balance of Tamim is :${poysha.getBalanceOfAddress(myWalletAddress)}`);

poysha.chain[1].transactions[0].amount = 1;
console.log('Is chain valid? ',poysha.isChainValid());