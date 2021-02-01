# Poysha
![](https://github.com/TamimEhsan/Poysha/blob/master/Assets/25days.jpg)

### Blocks
Blocks hold the information of the transaction . 
Any kind of necessary data and most importantly the hashes. 
It holds the hash of this block and also the hash of the previous block. 
This one uses SHA256 for hashing the fields of the block
This has function
- generateHash() => generates a SHA256 hash from its fields
- mineBlock() => calcualtes hash with given difficuly ie mining
### Blockchain
Some continuous chain of block is a block chain
The first block is created manually and is called **genesis block**. 
The chain has some functions
- getLatestBlock() 
- addNewBlock()
- isChainValid() => checks the hash and compares if the information provided in the blocks are consistent
### Mining
So, we used isChainValid() to alternate any mid blocks. 
But one might add new blocks and spam the hell out of blockchain. 
To remove this the chain needs a proof of work. 
To ensure this some chain has some rules. 
Like the hash should have n leading zeros. 
And as one can't predict a hash, So the hash should be done by mere brute force. 
A hash with 4 leading zeros takes quite time to generate. 
But how one can generate different hash? 
Well, add a dummy data which is to be changed to make that happen. 
So, when one computer successfully finds a hash with that difficulty then it is called mining. 
Then the hash is the proof of work. 

![proofOfWork](https://github.com/TamimEhsan/Poysha/blob/master/Assets/proofOfWork.PNG) 

Here we see that the hash contains 5 leading zeros and took about 20 seconds for the second block to mine it. The reason why first block took different time than second one is cause the contents of the block on which the hash works are different. 

### Transactions

A new block is created at about 10 minutes. Any new transactions are kept in a queue for that time being. Then after that  all of the pending transactions are put in a new block and send to mine.

### Rewards

Many computers try to mine a block. But the one who does it quickly will get the reward. As computational power gets increasing so does the difficulty. Current dificulty is 17 leading zeros in SHA256 hash. So when one mines a block a small portion is awarded to him. That will be pending for the next block. 

![proofOfWork](https://github.com/TamimEhsan/Poysha/blob/master/Assets/rewards.PNG) 

Here we see the address Tamim mined the block successfully and in the next transaction was awarded 100 poysha asa thin air.  So, yeah "Pacchish din may paysha double". 