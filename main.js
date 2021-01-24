const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index,timestamp,data,previousHash='') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
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
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0,'25/01,2021',"Genesis BLoxk","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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
console.log("Mining Block 1...");
poysha.addBlock(new Block(1,"25/01/2017",{amount:4}));
console.log("Mining Block 2...");
poysha.addBlock(new Block(2,"25/01/2017",{amount:10}));
/*
//console.log( JSON.stringify(poysha,null,4) );
console.log( "Is the chain valid? "+poysha.isChainValid() );

poysha.chain[1].data = {amount:100};
poysha.chain[1].hash = poysha.chain[1].calculateHash();

console.log( "Is the chain valid? "+poysha.isChainValid() );

*/