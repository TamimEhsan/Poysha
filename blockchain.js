const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transactions{
    constructor(fromAddress,toAddress,amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
    calculateHash(){
        return SHA256(this.fromAddress+this.toAddress+this.amount).toString();
    }
    signTransaction(signingKey){
        if( signingKey.getPublic('hex') !== this.fromAddress ){
            throw new Error("Can't sign transactions for other wallets");
        }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx,'base64');
        this.signature = sig.toDER('hex');
    }
    isValid(){
        if( this.fromAddress === null ) return true;
        if( !this.signature || this.signature.length === 0 ){
            throw new Error("No signature in this transactions");
        }
        const publicKey = ec.keyFromPublic(this.fromAddress,'hex');
        return publicKey.verify(this.calculateHash(),this.signature);
    }
}

class Block{
    constructor(timestamp,transactions,previousHash='') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash =  previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0; //This is used to change the hash value. cause other fields should be same
    }
    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
    }
    mineBlock(difficuly){
        while(this.hash.substring(0,difficuly)!== Array(difficuly+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }

    hasValidTransactions(){
        for( const tx of this.transactions ){
            if( !tx.isValid() ){
                return false;
            }
        }
        return true;
    }

}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block('25/01,2021',"Genesis BLoxk","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    minePendingTransaction( miningRewardAddress ){
        const rewardTx = new Transactions(null,miningRewardAddress,this.miningReward);
        this.pendingTransactions.push(rewardTx);
        let block = new Block(Date.now(),this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log("block mined successfully...");
        this.chain.push(block);

        this.pendingTransactions = [];
    }
    addTransaction(transaction){
        if( !transaction.fromAddress || !transaction.toAddress ){
            console.log(transaction.fromAddress);
            throw new Error("Transactions must have from and To");
        }

        if(!transaction.isValid()){
            throw new Error("cannt add transaction to chain");
        }

        this.pendingTransactions.push(transaction);
    }
    getBalanceOfAddress(address){
        let balance = 0;
        for( const block of this.chain ){
            for( const trans of block.transactions ){
                if( trans.fromAddress === address ){
                    balance-= trans.amount;
                }
                if( trans.toAddress === address ){
                    balance+=trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for(let i=1;i < this.chain.length; i++){
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if( !currBlock.hasValidTransactions() ){
                return false;
            }

            if( currBlock.hash != currBlock.calculateHash() ){
                return false;
            }

            if( currBlock.previousHash!= prevBlock.hash ){
                return false;
            }
        }
        return true;
    }
}

module.exports.Blockchain = Blockchain;
module.exports.Transactions = Transactions;