import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { Web3Storage, File, getFilesFromPath } from "web3.storage"; // @mehulagg/web3.storage
// import { DID } from 'dids'
// import { Integration } from 'lit-ceramic-integration-sdk'  // '@litelliott/lit-ceramic-integration'

class OmData {
  private graphApiUrl =
    "https://api.thegraph.com/subgraphs/name/richwarner/om-mumbai";
  private web3StorageApiToken =
    process.env.WEB3_STORAGE_API_TOKEN ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzQ2VmMGUxZWM2MmQxYmMzNjVGM0ZGMTEyRDU1Y0IwODFGQzQ0RGUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTczNDg0MjU4NjEsIm5hbWUiOiJEQVRBREFPIn0.LMFTddGfHq1raj0XwVhxWVN1J8JFp9XgbZCNx9XCj58";
  // private litCeramicIntegration = new Integration('https://ceramic-clay.3boxlabs.com', 'polygon')
  // private streamID = 'kjzl6cwe1jw1479rnblkk5u43ivxkuo29i4efdx1e7hk94qrhjl0d4u0dyys1au' // test data

  // Fetch all proposals created from subgraph
  async getProposals() {
    const eventQuery = `{ 
            proposalCreateds(first: 1000) { 
                id 
                groupId
                description
                proposalId
                startDate
                endDate
                fileUri
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
  async getDataAddedEvents() {
    const eventQuery = `{ 
            dataAddeds(first: 1000) {
                id
                dataId
                owner
                dateAdded
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

  // Fetch and decrypt all screenplays from storage in Lit/Ceramic
  async getScreenplays() {
    return {
      id: "1234234wer",
      title: "Boogie Nights",
    };
  }

  // Fetch and decrypt all screenplays from storage in Lit/Ceramic
  async getScreenplay(id: string) {}

  // Add screenplay record that will be encrypted and stored in Lit/Ceramic
  async addScreenplay(window: any, proverId: any, proof: any, screenplay: any) {
    console.log("Recevied new screenplay: ", screenplay);
    console.log("with proof: ", proof);

    // this.litCeramicIntegration.startLitClient(window)

    // const evmContractConditions = [
    // {
    //     contractAddress: '0xb71a679cfff330591d556c4b9f21c7739ca9590c',
    //     functionName: 'members',
    //     functionParams: [':userAddress'],
    //     functionAbi: {
    //         constant: true,
    //         inputs: [
    //         {
    //             name: '',
    //             type: 'address',
    //         },
    //         ],
    //         name: 'members',
    //         outputs: [
    //         {
    //             name: 'delegateKey',
    //             type: 'address',
    //         },
    //         {
    //             name: 'shares',
    //             type: 'uint256',
    //         },
    //         {
    //             name: 'loot',
    //             type: 'uint256',
    //         },
    //         {
    //             name: 'exists',
    //             type: 'bool',
    //         },
    //         {
    //             name: 'highestIndexYesVote',
    //             type: 'uint256',
    //         },
    //         {
    //             name: 'jailed',
    //             type: 'uint256',
    //         },
    //         ],
    //         payable: false,
    //         stateMutability: 'view',
    //         type: 'function',
    //     },
    //     chain: 'xdai',
    //     returnValueTest: {
    //         key: 'shares',
    //         comparator: '>=',
    //         value: '1',
    //     },
    //     },
    // ]

    // const streamId = await this.litCeramicIntegration.encryptAndWrite(screenplay, evmContractConditions, 'evmContractConditions')

    // console.log("Stream ID: ", streamId)
  }
}

export default new OmData();
