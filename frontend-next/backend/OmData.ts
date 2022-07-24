import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { access } from "fs";
import { Web3Storage, File, getFilesFromPath } from "web3.storage"; // @mehulagg/web3.storage
import Lit from './Lit'
// import { DID } from 'dids'
// import { Integration } from 'lit-ceramic-sdk' // '@litelliott/lit-ceramic-integration'

class OmData {
  private graphApiUrl = "https://api.thegraph.com/subgraphs/name/richwarner/om-mumbai";
  private web3StorageApiToken =
    process.env.WEB3_STORAGE_API_TOKEN ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzQ2VmMGUxZWM2MmQxYmMzNjVGM0ZGMTEyRDU1Y0IwODFGQzQ0RGUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTczNDg0MjU4NjEsIm5hbWUiOiJEQVRBREFPIn0.LMFTddGfHq1raj0XwVhxWVN1J8JFp9XgbZCNx9XCj58";
  // private litCeramicIntegration = new Integration('https://ceramic-clay.3boxlabs.com', 'polygon')
  // private streamID = 'kjzl6cwe1jw1479rnblkk5u43ivxkuo29i4efdx1e7hk94qrhjl0d4u0dyys1au' // test data  
  private chain = "mumbai"

  // Fetch all proposals created from subgraph
  async getProposals() {
    const eventQuery = `{ 
      proposalCreateds(first: 1000) { 
        groupId
        id
        endDate: proposalData_EndDate 
        IpfsURI: proposalData_IpfsURI
        startDate: proposalData_StartDate
        description: proposalData_description
        noCount: proposalData_noCount
        title: proposalData_title
        yesCount: proposalData_yesCount
        proposalCounter
    }}`;
    let data = "";
    const client = new ApolloClient({
      link: new HttpLink({ uri: this.graphApiUrl, fetch }),
      cache: new InMemoryCache(),
    });
    try {
      const result = await client.query({ query: gql(eventQuery) });
      data = result.data.proposalCreateds;
    } catch (err) {
      console.log(err);
    }
    return data;
  }

  // Fetch all data added events from subgraph
  async getDataByType(dataTypeId: number) {
    const eventQuery = `{ 
      dataAddeds(first: 1000, where: {dataInfos_dataType: ${dataTypeId}}) {
        dataId
        addedDate: dataInfos_addedDate
        dataOwner: dataInfos_dataOwner
        groupId: dataInfos_groupId
        title: dataInfos_title
        id
        dataURI: dataInfos_dataURI
        fileURI: dataInfos_fileURI
        dataType: dataInfos_dataType
        symmetricKey: dataInfos_symmetricKey
      }}`;
    let data = "";
    const client = new ApolloClient({
      link: new HttpLink({ uri: this.graphApiUrl, fetch }),
      cache: new InMemoryCache(),
    });
    try {
      const result = await client.query({ query: gql(eventQuery) });
      data = result.data.dataAddeds;
    } catch (err) {
      console.log(err);
    }
    return data;
  }

  // Fetch all group created events from subgraph
  async getGroupCreatedEvents() {
    const eventQuery = `{ 
      groupCreateds(first:1000) {
          id
          groupId
          depth
          zeroValue
        }}`;
    let data = "";
    const client = new ApolloClient({
      link: new HttpLink({ uri: this.graphApiUrl, fetch }),
      cache: new InMemoryCache(),
    });
    try {
      const result = await client.query({ query: gql(eventQuery) });
      data = result.data.groupCreateds;
    } catch (err) {
      console.log(err);
    }
    return data;
  }

  // Fetch all members added to a given group from subgraph
  async getMembersAddedByGroup(groupId: number) {
    const eventQuery = `{ 
      memberAddeds(where: {groupId: ${groupId}}) {
          id
          groupId
          identityCommitment
          root
        }}`;
    let data = "";
    const client = new ApolloClient({
      link: new HttpLink({ uri: this.graphApiUrl, fetch }),
      cache: new InMemoryCache(),
    });
    try {
      const result = await client.query({ query: gql(eventQuery) });
      data = result.data.memberAddeds;
    } catch (err) {
      console.log(err);
    }
    return data;
  }

  // Add a proposal. This creates two files on IPFS, one is the uploaded document, and the other
  //   contains JSON of the proposal data, including the document URI
  async addProposal(proposal: any) {
    // Add documents to permanent storage on web3.storage
    const web3StorageClient = new Web3Storage({
      token: this.web3StorageApiToken,
      endpoint: new URL("https://api.web3.storage"),
    });
    console.log("web3StorageClient ", web3StorageClient);
    const documentFileArray = [proposal.file];
    const documentCid = await web3StorageClient.put(documentFileArray, {
      wrapWithDirectory: false,
    });

    // Add the documentURI to the proposal object
    proposal.documentUri = "https://" + documentCid + ".ipfs.dweb.link";

    // Create permanent storage on web3.storage for the metadata too, with the documentURI embedded
    const proposalData = new Blob([JSON.stringify(proposal)], {
      type: "application/json",
    });
    const dataFileArray = [new File([proposalData], "proposal.json")];
    const dataCid = await web3StorageClient.put(dataFileArray, {
      wrapWithDirectory: false,
    });

    const proposalUri = "https://" + dataCid + ".ipfs.dweb.link";
    // console.log("Added proposal: ", proposalUri)

    return proposalUri;
  }

  // Add a screenplay. This creates two encrypted files on IPFS, one is the uploaded document, and the other
  //   contains JSON of the screnplay data.

  async addScreenplay(screenplay:any, accessControlConditions:any) {
    /*  
    const screenplayUris = {fileUri: "", dataUri: ""}
    
    // If not passed, set the conditions for decryption access that will be controlled by Lit
    if(!accessControlConditions) {
      accessControlConditions = [
        {
          contractAddress: '',
          standardContractType: '',
          chain: this.chain,
          method: 'eth_getBalance',
          parameters: [
            ':userAddress',
            'latest'
          ],
          returnValueTest: {
            comparator: '>=',
            value: '10000000000000'
          }
        }
      ]
    }
    
    // If document was provided, encrypt it with Lit
    if(screenplay.file) {
      const documentEncryptedPackage = await Lit.encryptFile(screenplay.file, accessControlConditions, this.chain);
    }

    // Encrypt the data object using Lit
    const dataEncryptedPackage = await Lit.encryptString(JSON.stringify(screenplay), accessControlConditions, this.chain);   
    
    
    // Add documents to permanent storage on web3.storage
    const web3StorageClient = new Web3Storage({
      token: this.web3StorageApiToken,
      endpoint: new URL("https://api.web3.storage"),
    });
    const documentFileArray = [screenplay.file];
    const documentCid = await web3StorageClient.put(documentFileArray, {
      wrapWithDirectory: true,
    });

    // Add the documentURI to the screenplay object
    screenplay.documentUri = "https://" + documentCid + ".ipfs.dweb.link";    
   

    // Create permanent storage on web3.storage for the metadata too, with the documentURI embedded
    const screenplayData = new Blob([screenplayEncryptedPackage.encryptedFile], {
      type: "application/octet-stream",
    });
    const dataFileArray = [new File([screenplayData], "screenplay.encrypted")];
    const dataCid = await web3StorageClient.put(dataFileArray, {
      wrapWithDirectory: false,
    });

    const screenplayUri = "https://" + dataCid + ".ipfs.dweb.link";
    // console.log("Added screenplay: ", screenplayUri)

    return screenplayUris;
    */
  }


  async decrypt(uri:string, encryptedSymmetricKey:string) {

  }

  // Fetch and decrypt all screenplays from storage in Lit/Ceramic
  // async getScreenplay(id: string) {}

  // Add screenplay record that will be encrypted and stored in Lit/Ceramic
  // async addScreenplay(window: any, proverId: any, proof: any, screenplay: any) {
  //   console.log("Recevied new screenplay: ", screenplay);
  //   console.log("with proof: ", proof);

    // this.litCeramicIntegration.startLitClient(window)

   

    // const streamId = await this.litCeramicIntegration.encryptAndWrite(screenplay, evmContractConditions, 'evmContractConditions')

    // console.log("Stream ID: ", streamId)
  // }

}

export default new OmData();