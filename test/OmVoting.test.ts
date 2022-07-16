import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('OmVoting', function () {

    before(async () => {
        const OmVoting = await ethers.getContractFactory("OmVoting");
        const contract = await OmVoting.deploy();
        await contract.deployed();
        console.log('contract deployed at:', contract.address);

        const admin = await ethers.provider.getSigner(0);
        const member1 = await ethers.provider.getSigner(1);
        const member2 = await ethers.provider.getSigner(2);
        const member3 = await ethers.provider.getSigner(3);
        const nonMember = await ethers.provider.getSigner(4);

        const addressAdmin = await admin.getAddress();
        const address1 = await member1.getAddress();
        const address2 = await member2.getAddress();
        const address3 = await member3.getAddress();
        const address4 = await nonMember.getAddress();

        const memberList = [address1, address2, address3];
    });

    it("should create a DAO group", async () => {
        const daoName = "DataDao";
        const groupId = 1;
        const transaction = await contract.createDao(daoName, memberList);
        await expect(transaction).to.emit(contract, "DaoCreated").withArgs(groupId, daoName);
    });

    it("should create a new proposal", async () => {
        const groupId = 1;
        const proposalId = 1;
        const question = "Should X data be sold to Y?";
        const ipfsURI = "some uri here";
        const transaction = await contract.connect(member1).newProposal(groupId, question, ipfsURI);
        await expect(transaction).to.emit(contract, "ProposalCreated").withArgs(groupId, proposalId, question, ipfsURI);
    });

    it("should not allow non-member to create a proposal", async () => {
        const groupId = 1;
        const proposalId = 2;
        const question = "Should X data be sold to Y?";
        const ipfsURI = "some uri here";
        const transaction = await contract.connect(nonMember).newProposal(groupId, question, ipfsURI);
        await expect(transaction).to.be.revertedWith("Address is not a member of this group");
    });

    it("should record a member's vote", async () => {
        const groupId = 1;
        const proposalId = 1;
        const vote = true;
        const transaction = await contract.connect(member2).castVote(groupId, proposalId, vote);
        await expect(transaction).to.emit(contract, "VoteCast").withArgs(groupId, proposalId, vote);
    });

    it("should not allow non-member to vote", async () => {
        const groupId = 1;
        const proposalId = 1;
        const vote = true;
        const transaction = await contract.connect(nonMember).castVote(groupId, proposalId, vote);
        await expect(transaction).to.be.revertedWith("Address is not a member of this group");
    })

});
