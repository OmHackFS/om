import { useMemo, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";
import Semaphore from "../pages/utils/Semaphore.json";
import * as ethUtil from "ethereumjs-util";
import * as sigUtil from "@metamask/eth-sig-util";
import { ethers, Signer } from "ethers";
// import omToken from "./utils/OmContract.json";
import backEnd from "../backend/OmData";



import { AbstractConnector } from "@web3-react/abstract-connector";
import { Provider } from "../utils/provider";
import { injected } from "../utils/connectors";

const omContractAddress = "0x98552919780D36f04Aaec58C80de436A3CD43f06";

export const SendTransactionReadData= ({
  group,
  dataTitle,
  dataDescription,
  authorName,
  authorContact,
  proof,
  nullifierHash,
  externalNullifier,
  root,
  bytes32signal,
  dataId,
  setData,
  encryptedData
}: any) => {
  const context = useWeb3React<Provider>();
  const { activate, active, account, library } = context;

  const [signer, setSigner] = useState<Signer>();
  const [signerAddr, setSignerAddr] = useState<string | null>(null);
  const [encryptedIdData, setEncryptedIdData] = useState();
  const [idData, setIdData] = useState();
  const [message, setMessage] = useState();
  const [creating, setCreating] = useState(false);
  const [proposalUri, setProposalUri] = useState<string | null>(null);
  const [contract,setContract] =useState<any>();
  const [screenplay,setScreenplay] = useState<any>();
  

  // const omContract : any= useMemo(() => {
  //   return new ethers.Contract(omContractAddress, omContract.abi, signer);
  // }, [signer]);

  useEffect((): void => {
    // console.log("Send Tx Data ID")
    // console.log(dataId);
    // console.log("Encrypted Data")
    // console.log(encryptedData);
    // console.log(encryptedData.dataURI);
    // console.log(encryptedData.fileURI);


    connectWallet();

  }, []);

    async function decryptData(dataUriInput : any)  {
      const zipObject = (await backEnd.decryptFromUri(dataUriInput, null)).decryptedFile
      const blob = await zipObject['string.txt'].async('blob')
      // Open the json in a new window
        // const url = window.URL.createObjectURL(blob);
        // window.open(url, '_blank', '');
      // Or read it into a json object 
      const fr = new FileReader();
      fr.onload = (e) => {
        const objectJson = e.target ? e.target.result : ""
        // const dataObj=JSON.parse(objectJson.toString());
        setData(objectJson);
        console.log("Screenplay updated from decrypted json: ", objectJson)
      };
      fr.readAsText(blob);
    }

    async function decryptDocument(documentUri : any) {
      const zipObject = (await backEnd.decryptFromUri(documentUri, null)).decryptedFile
      console.log(zipObject)
      const key = Object.keys(zipObject)[1]
      const blob = await zipObject[key].async('blob')
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank', '');
    }


  const handleCreateProposal = async (e: any) => {
    e.preventDefault();
    setCreating(true);
  

    // console.log(contract);
    // const dataUri2 =encryptedData.dataURI
    // const fileUri2=encryptedData.fileURI

  
  




    const proposalCoordinator ="0xd770134156f9aB742fDB4561A684187f733A9586"


    const group =1;
    const accessDataRoot= root;
    const signal = bytes32signal;
    const accessDataNullifierHash= nullifierHash;
    const accessDataExternalNullifierHash =externalNullifier;
    const accessDataProof = proof;
    //try only if succeds decrypt
    try{
      // const accessDataTx = await contract.accessData(
      //   group,
      //   accessDataRoot,
      //   signal,
      //   accessDataNullifierHash,
      //   accessDataExternalNullifierHash,
      //   accessDataProof
      // )
      // const tx = await accessDataTx.wait(10)
      // console.log(tx);


    decryptData(encryptedData.dataURI);
    //Decrypt Data if Passed:
    //Send data to new Page
    // console.log("Decrypted Data");
    //Call dataInfo Page
    //Send Data infoPage


    } catch(error){
      console.log(error);
    }
    





    

    setCreating(false);

  };

 

  async function connectWallet() {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    const signer=(new ethers.providers.Web3Provider((window as any).ethereum)).getSigner();

    const omContractAddress = "0x98552919780D36f04Aaec58C80de436A3CD43f06";
    const omABI = [{"inputs":[{"components":[{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint8","name":"merkleTreeDepth","type":"uint8"}],"internalType":"struct OmContract.Verifier[]","name":"_verifiers","type":"tuple[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"dataId","type":"uint256"},{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"address","name":"dataOwner","type":"address"},{"internalType":"uint256","name":"addedDate","type":"uint256"},{"internalType":"string","name":"dataURI","type":"string"},{"internalType":"string","name":"fileURI","type":"string"},{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"dataType","type":"uint256"},{"internalType":"string","name":"symmetricKey","type":"string"}],"indexed":false,"internalType":"struct OmContract.dataStructure","name":"dataInfos","type":"tuple"}],"name":"DataAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"depth","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"zeroValue","type":"uint256"}],"name":"GroupCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"identityCommitment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"root","type":"uint256"}],"name":"MemberAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"identityCommitment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"root","type":"uint256"}],"name":"MemberRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"nullifierHash","type":"uint256"}],"name":"NullifierHashAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":false,"internalType":"address","name":"admin","type":"address"}],"name":"OmGroupCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"memberID","type":"uint256"}],"name":"OmMemberAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"memberID","type":"uint256"}],"name":"OmMemberRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"signal","type":"bytes32"}],"name":"ProofVerified","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"proposalCounter","type":"uint256"},{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"yesCount","type":"uint256"},{"internalType":"uint256","name":"noCount","type":"uint256"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"string","name":"IpfsURI","type":"string"}],"indexed":false,"internalType":"struct OmContract.Proposal","name":"proposalData","type":"tuple"}],"name":"ProposalCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"proposalId","type":"uint256"},{"indexed":true,"internalType":"bool","name":"vote","type":"bool"}],"name":"VoteCast","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ProposalList","outputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"yesCount","type":"uint256"},{"internalType":"uint256","name":"noCount","type":"uint256"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"string","name":"IpfsURI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"root","type":"uint256"},{"internalType":"bytes32","name":"signal","type":"bytes32"},{"internalType":"uint256","name":"nullifierHash","type":"uint256"},{"internalType":"uint256","name":"externalNullifier","type":"uint256"},{"internalType":"uint256[8]","name":"proof","type":"uint256[8]"}],"name":"accessData","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"dataURI","type":"string"},{"internalType":"string","name":"fileURI","type":"string"},{"internalType":"uint256","name":"dataType","type":"uint256"},{"internalType":"string","name":"symmetricKey","type":"string"},{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"root","type":"uint256"},{"internalType":"bytes32","name":"signal","type":"bytes32"},{"internalType":"uint256","name":"nullifierHash","type":"uint256"},{"internalType":"uint256","name":"externalNullifier","type":"uint256"},{"internalType":"uint256[8]","name":"proof","type":"uint256[8]"}],"name":"addData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"identityCommitment","type":"uint256"}],"name":"addMember","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"canGroupAddData","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"canGroupPropose","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"root","type":"uint256"},{"internalType":"bool","name":"vote","type":"bool"},{"internalType":"uint256","name":"nullifierHash","type":"uint256"},{"internalType":"uint256","name":"externalNullifierProposalId","type":"uint256"},{"internalType":"bytes32","name":"signal","type":"bytes32"},{"internalType":"uint256[8]","name":"proof","type":"uint256[8]"}],"name":"castVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"depth","type":"uint8"},{"internalType":"uint256","name":"zeroValue","type":"uint256"},{"internalType":"address","name":"admin","type":"address"},{"internalType":"bool","name":"canPropose","type":"bool"},{"internalType":"bool","name":"canAddData","type":"bool"}],"name":"createGroup","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"root","type":"uint256"},{"internalType":"uint256","name":"startDate","type":"uint256"},{"internalType":"uint256","name":"endDate","type":"uint256"},{"internalType":"string","name":"proposalURI","type":"string"},{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"bytes32","name":"signal","type":"bytes32"},{"internalType":"uint256","name":"nullifierHash","type":"uint256"},{"internalType":"uint256","name":"externalNullifier","type":"uint256"},{"internalType":"uint256[8]","name":"proof","type":"uint256[8]"}],"name":"createProposal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dataFileCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"dataList","outputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"address","name":"dataOwner","type":"address"},{"internalType":"uint256","name":"addedDate","type":"uint256"},{"internalType":"string","name":"dataURI","type":"string"},{"internalType":"string","name":"fileURI","type":"string"},{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"dataType","type":"uint256"},{"internalType":"string","name":"symmetricKey","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"}],"name":"getDepth","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"}],"name":"getNumberOfLeaves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"proposalId","type":"uint256"}],"name":"getProposalData","outputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"yesCount","type":"uint256"},{"internalType":"uint256","name":"noCount","type":"uint256"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"string","name":"IpfsURI","type":"string"}],"internalType":"struct OmContract.Proposal","name":"ProposalData","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"}],"name":"getRoot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"groupAdmins","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"groupCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"groupMembership","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proposalCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"uint256","name":"identityCommitment","type":"uint256"},{"internalType":"uint256[]","name":"proofSiblings","type":"uint256[]"},{"internalType":"uint8[]","name":"proofPathIndices","type":"uint8[]"}],"name":"removeMember","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"verifiers","outputs":[{"internalType":"contract IVerifier","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"groupId","type":"uint256"},{"internalType":"bytes32","name":"signal","type":"bytes32"},{"internalType":"uint256","name":"root","type":"uint256"},{"internalType":"uint256","name":"nullifierHash","type":"uint256"},{"internalType":"uint256","name":"externalNullifier","type":"uint256"},{"internalType":"uint256[8]","name":"proof","type":"uint256[8]"}],"name":"verifyProof","outputs":[],"stateMutability":"nonpayable","type":"function"}]

    const omContract = new ethers.Contract(omContractAddress, omABI, signer);
    // console.log(omContract);
    // console.log(signer);
    setContract(omContract);
    setSigner(signer);
  }
  console.log("context ", context);
  return (
    <>
      <div className="flex flex-col">
        {!proposalUri ? (
          <button
            onClick={handleCreateProposal}
            className="inline-flex mt-5 px-12 py-4
        text-sm text-white
        bg-indigo-500
        rounded-lg
        outline-none
        hover:bg-indigo-600
        ring-indigo-300 inline-flex"
          >
            {creating ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            Create Proposal
          </button>
        ) : null}
        {proposalUri ? (
          <div className="h-16 items-center inline-flex mt-2 justify-center rounded-md border border-transparent bg-green-100 px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Proposal successfully created
            <p>Proposal URI: {proposalUri}</p>
          </div>
        ) : null}
      </div>
    </>
  );
};
