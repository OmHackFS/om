import { useState } from "react";
import {Identity} from "@semaphore-protocol/identity";
import {Group} from "@semaphore-protocol/group";
import Semaphore from "../pages/utils/Semaphore.json";
import { generateProof, verifyProof, packToSolidityProof } from "@semaphore-protocol/proof";
import ethUtil from "ethereumjs-util";
import sigUtil from "@metamask/eth-sig-util";
// import dotenv from "dotenv";
import { ethers } from "ethers";

// dotenv.config();
// import { NFTStorage, Blob } from 'nft.storage'
// import {IPFS} from 'ipfs';
// import * as fs from 'fs';

export default function Experiment() {
  const [identity, setIdentity] = useState<any>();
  const [trapdoor, setTrapdoor] = useState<bigint>();
  const [nullifier, setNullifier] = useState<bigint>();
  const [identityCommitment, setIdentityCommitment] = useState<bigint>();

  const [group1, setGroup1] = useState<any>();
  const [group2, setGroup2] = useState("");

  const [group1Proof, setGroup1Proof] = useState("");

  const [group1Status, setGroup1Status] = useState("");

  const [group1Verification, setGroup1Verification] = useState("");
  const [group1ExternalNullifier, setGroup1ExternalNullifier] = useState("");
  const [group1NullifierHash, setGroup1NullifierHash] = useState("");
  const [group1SolidityProof, setGroup1SolidityProof] = useState("");
  const [createGroupTx, setCreateGroupTx] = useState("");
  const [verifyOnChainTx, setVerifyOnChainTx] = useState("");

  const TEST_NET_PRIVATE_KEY = process.env.TEST_NET_PRIVATE_KEY;
  const SemaphoreABI = Semaphore.abi;
  const SempahoreAddress = "0x99aAb52e60f40AAC0BFE53e003De847bBDbC9611";
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/HTnCRg0KxPt5aG7FCaMePEWGK1nRegjD"
  );
  const signer = new ethers.Wallet("").connect(provider);

  const semaphoreContract = new ethers.Contract(
    SempahoreAddress,
    SemaphoreABI,
    signer
  );

  const depth = 20;
  const admin = "0xd770134156f9aB742fDB4561A684187f733A9586";
  const signal = "Hello ZK";
  const signalBytes32 = ethers.utils.formatBytes32String(signal);
  const groupId = 7579;
  let zeroValue = 0;

  function generateNewId() {
    const newIdentity = new Identity();
    const newTrapdoor = newIdentity.getTrapdoor();
    const newNullifier = newIdentity.getNullifier();
    const newIdentityCommitment = newIdentity.generateCommitment();

    console.log(newIdentity);
    console.log(newTrapdoor);
    console.log(newNullifier);
    console.log(newIdentityCommitment);

    setIdentity(newIdentity);
    setTrapdoor(newTrapdoor);
    setNullifier(newNullifier);
    setIdentityCommitment(newIdentityCommitment);
  }
  async function Connect() {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    const newId = new Identity();
    const IdTrapdoor = newId.getTrapdoor();
    const IdNullifer = newId.getNullifier();
    const IdCommitment = newId.generateCommitment();

    const encryptionPublicKey = await (window as any).ethereum.request({
      method: "eth_getEncryptionPublicKey",
      params: [address], // you must have access to the specified account
    });

    console.log(address);

    console.log(encryptionPublicKey);

    const encryptedIdTrapdoor = ethUtil.bufferToHex(
      Buffer.from(
        JSON.stringify(
          sigUtil.encrypt({
            publicKey: encryptionPublicKey,
            data: IdTrapdoor.toString(),
            version: "x25519-xsalsa20-poly1305",
          })
        ),
        "utf8"
      )
    );

    const NFT_STORAGE_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIzZDg1OTczYUU3ZTI1RTdlMTNEZEUwZDhmQzIwMzgwQTQ0NDc4NUIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzU4Mzg2OTU5MywibmFtZSI6IkhhY2tGUyJ9.ldx5AlCgYy2cGrgXOpTPVd2xA68SHcU4_of9MsNmEIw";
    // const client = new NFTStorage({ token:NFT_STORAGE_TOKEN});
    // const IPFSdata = new Blob([encryptedIdTrapdoor]);
    // const cid = await client.storeBlob(IPFSdata);

    // const dataFromIPFS = await fetch(`https://ipfs.io/ipfs/${cid}`);

    // console.log("IPFS Address")
    // console.log(cid);
    // console.log(IdTrapdoor);
    console.log(encryptedIdTrapdoor);

    // console.log("Data Fetched from IPFS");
    // console.log(dataFromIPFS.response);

    // const decryptedMessage = await ethereum.request({
    //   method: 'eth_decrypt',
    //   params: [encryptedIdTrapdoor, address],
    // });
    // console.log("Decrypted Message");
    // console.log(decryptedMessage);
  }

  function createNewGroup() {
    // Default parameters: treeDepth = 20, zeroValue = BigInt(0).

    const group = new Group();

    console.log(group);

    group.addMember(identityCommitment as bigint);

    setGroup1(group);
    setGroup1Status("Created!");
  }

  async function generateProofGroup1() {
    const externalNullifier = (group1 as any).root;

    const fullProof = await generateProof(
      identity as Identity,
      group1 as Group,
      externalNullifier,
      signal,
      {
        zkeyFilePath: "./semaphore.zkey",
        wasmFilePath: "./semaphore.wasm",
      }
    );

    // const { nullifierHash } = fullProof.publicSignals
    const solidityProof = packToSolidityProof(fullProof.proof);

    setGroup1Proof(fullProof as any);
    // setGroup1NullifierHash(nullifierHash);
    setGroup1SolidityProof(solidityProof as any);
    setGroup1ExternalNullifier(externalNullifier);
  }

  async function verifyProofGroup1() {
    const verificationKey = await fetch(
      "http://localhost:3000/semaphore.json"
    ).then(function (res) {
      return res.json();
    });

    const res = await verifyProof(verificationKey, group1Proof as any); // true or false.

    const response = res.toString();
    setGroup1Verification(response);

    console.log(res);
  }

  async function addGroupOnChain() {
    console.log("Create Group Tx");

    // const group2 = new Group()

    const createGroup = await semaphoreContract.createGroup(
      groupId,
      20,
      0,
      admin
    );
    const tx = await createGroup.wait();
    console.log(identityCommitment);

    const addMember = await semaphoreContract.addMember(
      groupId,
      identityCommitment
    );
    const tx2 = await addMember.wait();

    console.log(tx);
    console.log(tx.transactionHash);
    console.log(tx2.transactionHash);
    setCreateGroupTx(tx.transactionHash);
  }

  async function verifyIdentityOnChain() {
    console.log("On Chain Verification Tx");

    const externalNullifier = 1000000000;

    const fullProof2 = await generateProof(
      identity as Identity,
      group1 as Group,
      externalNullifier as any,
      signal,
      {
        zkeyFilePath: "./semaphore.zkey",
        wasmFilePath: "./semaphore.wasm",
      }
    );

    const { nullifierHash } = fullProof2.publicSignals;
    const solidityProof2 = packToSolidityProof(fullProof2.proof);
    console.log(solidityProof2);

    const checkMembership = await semaphoreContract.verifyProof(
      groupId,
      signalBytes32,
      nullifierHash,
      externalNullifier,
      solidityProof2,
      { gasLimit: 1500000 }
    );
    const tx = await checkMembership.wait();

    console.log(tx);
    setVerifyOnChainTx(tx.transactionHash);
  }

  return (
    <div>
      <h1>Hello Zk World!</h1>
      <button onClick={Connect}>Connect Wallet</button>
      <button onClick={generateNewId}>1. Generate New Id</button>
      <h5>Trapdoor</h5>
      <p>{(trapdoor as any).toString()}</p>
      <h5>Nullifier</h5>
      <p>{(nullifier as any).toString()}</p>
      <h5>Identity Commitment</h5>
      <p>{(identityCommitment as any).toString()}</p>

      <h3>2. Create New Group</h3>

      <button onClick={createNewGroup}>Create New Group</button>

      <p>{group1Status}</p>

      <h3>3. Generate Proof for Group1</h3>

      <button onClick={generateProofGroup1}>Generate</button>
      <p>{JSON.stringify(group1Proof)}</p>

      <h3>4. Add Group On Chain</h3>

      <button onClick={addGroupOnChain}>Add Group On Chain</button>
      <p>{createGroupTx}</p>

      <h3>5. Verify Proof Off Chain</h3>

      <button onClick={verifyProofGroup1}>Verify Membership Off Chain</button>
      <p>{group1Verification}</p>

      <h3>6. Verify Proof On Chain(Currently Failing)</h3>
      <button onClick={verifyIdentityOnChain}>
        Verify Membership On Chain
      </button>
      <p>{verifyOnChainTx}</p>
    </div>
  );
}
