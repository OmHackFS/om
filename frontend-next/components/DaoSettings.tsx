import { useState,useEffect } from "react";
import {ethers} from "ethers";
// import { ContextExclusionPlugin } from "webpack";

export const DaoSettings = () => {
  const [contract,setContract]= useState<any>();
  const [signer,setSigner] = useState<any>();
  const [createGroupId,setCreateGroupId] = useState<any>();

  const [addMemberGroupId,setAddMemberGroupId] = useState<any>();
  const [addMemberCommitmentId,setAddMemberCommitmentId] = useState<any>();

  useEffect((): void => {
 
   connectWallet();


  
  }, []);


  



  function createGroup(e:any) {
    e.preventDefault();
    console.log("Create Groups");
  
  }

  async function addMember() {
    console.log("Add Member");
    console.log(addMemberGroupId);
    console.log(addMemberCommitmentId);
    const addMemberTx = await contract.addMember(addMemberGroupId,addMemberCommitmentId);
    const tx = await addMemberTx.wait();
    console.log(tx);
  }

  function removeMember() {
    console.log("Remove Member");
  }

  async function connectWallet() {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    const signer=(new ethers.providers.Web3Provider((window as any).ethereum)).getSigner();

    const omContractAddress = "0x560aBf82Eb1D8C86968f4314ff6a7770088f0728";
    const omABI = [{"inputs":[{"components":[{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint8","name":"merkleTreeDepth","type":"uint8"}],"internalType":"struct OmContract.Verifier[]","name":"_verifiers","type":"tuple[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"dataId","type":"uint256"},{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"address","name":"dataOwner","type":"address"},{"internalType":"uint256","name":"addedDate","type":"uint256"},{"internalType":"string","name":"dataURI","type":"string"},{"internalType":"string","name":"fileURI","type":"string"},{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"dataType","type":"uint256"},{"internalType":"string","name":"symmetricKey","type":"string"}],"indexed":false,"internalType":"struct OmContract.dataStructure","name":"dataInfos","type":"tuple"}],"name":"DataAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"depth","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"zeroValue","type":"uint256"}],"name":"GroupCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"identityCommitment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"root","type":"uint256"}],"name":"MemberAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"identityCommitment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"root","type":"uint256"}],"name":"MemberRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"nullifierHash","type":"uint256"}],"name":"NullifierHashAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":false,"internalType":"address","name":"admin","type":"address"}],"name":"OmGroupCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"memberID","type":"uint256"}],"name":"OmMemberAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"memberID","type":"uint256"}],"name":"OmMemberRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"signal","type":"bytes32"}],"name":"ProofVerified","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"proposalCounter","type":"uint256"},{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"yesCount","type":"uint256"},{"internalType":"uint256","name":"noCount","type":"uint256"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"string","name":"IpfsURI","type":"string"}],"indexed":false,"internalType":"struct OmContract.Proposal","name":"proposalData","type":"tuple"}],"name":"ProposalCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"proposalId","type":"uint256"},{"indexed":true,"internalType":"bool","name":"vote","type":"bool"}],"name":"VoteCast","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ProposalList","outputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"yesCount","type":"uint256"},{"internalType":"uint256","name":"noCount","type":"uint256"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"string","name":"IpfsURI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"root","type":"uint256"},{"internalType":"bytes32","name":"signal","type":"bytes32"},{"internalType":"uint256","name":"nullifierHash","type":"uint256"},{"internalType":"uint256","name":"externalNullifier","type":"uint256"},{"internalType":"uint256[8]","name":"proof","type":"uint256[8]"}],"name":"accessData","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"dataURI","type":"string"},{"internalType":"string","name":"fileURI","type":"string"},{"internalType":"uint256","name":"dataType","type":"uint256"},{"internalType":"string","name":"symmetricKey","type":"string"},{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"root","type":"uint256"},{"internalType":"bytes32","name":"signal","type":"bytes32"},{"internalType":"uint256","name":"nullifierHash","type":"uint256"},{"internalType":"uint256","name":"externalNullifier","type":"uint256"},{"internalType":"uint256[8]","name":"proof","type":"uint256[8]"}],"name":"addData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"identityCommitment","type":"uint256"}],"name":"addMember","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"canGroupAddData","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"canGroupPropose","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"root","type":"uint256"},{"internalType":"bool","name":"vote","type":"bool"},{"internalType":"uint256","name":"nullifierHash","type":"uint256"},{"internalType":"uint256","name":"externalNullifierProposalId","type":"uint256"},{"internalType":"bytes32","name":"signal","type":"bytes32"},{"internalType":"uint256[8]","name":"proof","type":"uint256[8]"}],"name":"castVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"depth","type":"uint8"},{"internalType":"uint256","name":"zeroValue","type":"uint256"},{"internalType":"address","name":"admin","type":"address"},{"internalType":"bool","name":"canPropose","type":"bool"},{"internalType":"bool","name":"canAddData","type":"bool"}],"name":"createGroup","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"root","type":"uint256"},{"internalType":"uint256","name":"startDate","type":"uint256"},{"internalType":"uint256","name":"endDate","type":"uint256"},{"internalType":"string","name":"proposalURI","type":"string"},{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"bytes32","name":"signal","type":"bytes32"},{"internalType":"uint256","name":"nullifierHash","type":"uint256"},{"internalType":"uint256","name":"externalNullifier","type":"uint256"},{"internalType":"uint256[8]","name":"proof","type":"uint256[8]"}],"name":"createProposal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dataFileCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"dataList","outputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"address","name":"dataOwner","type":"address"},{"internalType":"uint256","name":"addedDate","type":"uint256"},{"internalType":"string","name":"dataURI","type":"string"},{"internalType":"string","name":"fileURI","type":"string"},{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"dataType","type":"uint256"},{"internalType":"string","name":"symmetricKey","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"}],"name":"getDepth","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"}],"name":"getNumberOfLeaves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"proposalId","type":"uint256"}],"name":"getProposalData","outputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"yesCount","type":"uint256"},{"internalType":"uint256","name":"noCount","type":"uint256"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"string","name":"IpfsURI","type":"string"}],"internalType":"struct OmContract.Proposal","name":"ProposalData","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"}],"name":"getRoot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"groupAdmins","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"groupCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"groupMembership","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proposalCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"identityCommitment","type":"uint256"},{"internalType":"uint256[]","name":"proofSiblings","type":"uint256[]"},{"internalType":"uint8[]","name":"proofPathIndices","type":"uint8[]"}],"name":"removeMember","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"verifiers","outputs":[{"internalType":"contract IVerifier","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"bytes32","name":"signal","type":"bytes32"},{"internalType":"uint256","name":"root","type":"uint256"},{"internalType":"uint256","name":"nullifierHash","type":"uint256"},{"internalType":"uint256","name":"externalNullifier","type":"uint256"},{"internalType":"uint256[8]","name":"proof","type":"uint256[8]"}],"name":"verifyProof","outputs":[],"stateMutability":"nonpayable","type":"function"}]

    const omContract = new ethers.Contract(omContractAddress, omABI, signer);
    console.log(omContract);
    console.log(signer);
    setContract(omContract);
    setSigner(signer);
  }

  return (
    <>
       <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add Member
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Make this transaction
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-6 sm:col-span-5">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Group Id
                      </label>
                      <input
                        type="number"
                        autoComplete="given-name"
                        onChange = {(e) => setAddMemberGroupId(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-5">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                       Commitment Identity
                      </label>
                      <input
                        type="number"
                        autoComplete="family-name"
                        onChange = {(e) => setAddMemberCommitmentId(e.target.value)}

                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <button
                        className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={addMember}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Create Group
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Make this transaction
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-6 sm:col-span-5">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Group Id
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-5">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Data 2
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-5">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Data 2
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-5">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Data 2
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-5">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Data 2
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <button
                        type="submit"
                        className="mt-3 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={createGroup}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
