const SHA256 = require('crypto-js/sha256');

class Transactions{
    constructor(fromAddress,toAddress,amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
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
        let block = new Block(Date.now(),this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log("block mined successfully...");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transactions(null,miningRewardAddress,this.miningReward)
        ];
    }
    createTransaction(transaction){
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

let poysha = new Blockchain();

poysha.createTransaction( new Transactions('address1','address2',100) );
poysha.createTransaction( new Transactions('address2','address1',50) );

console.log("starting mining...");
poysha.minePendingTransaction('tamims-adress');

//console.log(`Balance of address1 is :${poysha.getBalanceOfAddress('address1')}`);
//console.log(`Balance of address2 is :${poysha.getBalanceOfAddress('address2')}`);
console.log(`Balance of Tamim is :${poysha.getBalanceOfAddress('tamims-adress')}`);

console.log("-------------------------\nstarting mining...");
poysha.minePendingTransaction('tamims-adress');
console.log(`Balance of Tamim is :${poysha.getBalanceOfAddress('tamims-adress')}`);