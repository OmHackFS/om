# Om

A DAO platform that has a decentralized and private data storage layer

This storage layer will have 2 types of access into it:

1. Full access of an specific data set based on smart contract logic(for example: Users A can access data type A, users with soulbound B could access data sets B and so on). 

2. We will have Zk layer data access(this is still in research mode). In this type of access, specific users will have access to properties of the data and not the full data. For example: a user will not have data from Dao members, but would be able to check: How many DAO members are above 18, how many DAO members are Men or Woman, How many members have Phd. All this without having specific data from each DAO Member.(The Zk feature of validating a Private dataset property later could be use for many other things such as proving specific properties to clients/buyers/etc..)


For the proof of concept we will use
 -IPFS to return data after an specific logic(maybe this data can be encrypted if its possible to decrypt with the smart contract itself and if its not to gas heavy) 
-And for the case of Data activating logic(for example when a data value or information is used as an argument/input to a function) we will use SmartContracts as proxies.

The idea is that later the api to acmes data would substitute the IPFS and SmartContract aspect.

An for the case of the Property access, our initial idea for the flow would look like this:
1. Data property is requested
2. Data Proof is generated form a Trusted FileCoin Data provider(Factor8 Solution for example)
3.Proof would be encrypted with the requires public key
4.Proof would be decrypted and verified with staticCalldata on a SmartContract Verifier deployed on FVM.

Right now we are looking for possible mentors who could help us validate and discuss new possible ideas that could be beneficial for the Filecoin ecosystem and Filecoin Data Providers.

A possible future we envision to this zkDapp is that existing days would add a Filecoin data layer to their current ecosystem, New Daos that are Data-Driven would start to emerge(Photographers Dao, Music Artists Dao, Video Related Daos, DAOs that query and organise existing outside World Data, etc.)