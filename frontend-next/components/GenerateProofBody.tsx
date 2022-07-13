import { useState } from "react";
import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";
import Semaphore from "../pages/utils/Semaphore.json";
import {
    generateProof,
  verifyProof,
  packToSolidityProof,
} from "@semaphore-protocol/proof";
// import generateProof from "@semaphore-protocol/proof";
import ethUtil from "ethereumjs-util";
import sigUtil from "@metamask/eth-sig-util";
import { ethers } from "ethers";


const depth = 32;
const admin = "0xd770134156f9aB742fDB4561A684187f733A9586";
const signal = "Hello ZK";
const signalBytes32 = ethers.utils.formatBytes32String(signal);
const groupId = 7579;
let zeroValue = 0;

export const GenerateProofBody = () => {
  const [identity, setIdentity] = useState<any>();
  const [trapdoor, setTrapdoor] = useState<bigint>();
  const [nullifier, setNullifier] = useState<bigint>();
  const [identityCommitment, setIdentityCommitment] = useState<bigint>();

  const [group1, setGroup1] = useState<any>();
  const [group2, setGroup2] = useState("");

  const [group1Proof, setGroup1Proof] = useState("");
  const [group1Status, setGroup1Status] = useState("");

  const [group1ExternalNullifier, setGroup1ExternalNullifier] = useState("");
  const [group1NullifierHash, setGroup1NullifierHash] = useState<any>();
  const [group1SolidityProof, setGroup1SolidityProof] = useState("");

  const handleClickGenerateProof = async (e: any) => {
    e.preventDefault();

    // 1. Create new identity, trapdoor, nullifier and identityCommitment
    // https://semaphore.appliedzkp.org/docs/guides/identities
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

    // 2. Create new group
    // https://semaphore.appliedzkp.org/docs/guides/groups
    const group = new Group(depth);

    console.log(group);

    // Add members to an off-chain group
    // https://semaphore.appliedzkp.org/docs/guides/groups#add-members-to-an-off-chain-group
    group && group.addMember(identityCommitment as any);

    setGroup1(group);
    setGroup1Status("Created!");

    // 3. Generate a proof off-chain
    const externalNullifier = group1 && group1.root;

    // const fullProof = await generateProof(
    //   identity as Identity,
    //   group1 as Group,
    //   externalNullifier,
    //   signal,
    //   {
    //     zkeyFilePath: "/semaphore.zkey",
    //     wasmFilePath: "/semaphore.wasm",
    //   }
    // );

    // const { nullifierHash } = fullProof.publicSignals
    // const solidityProof = packToSolidityProof(fullProof.proof);

    // setGroup1Proof(fullProof as any);
    // setGroup1NullifierHash(nullifierHash);
    // setGroup1SolidityProof(solidityProof as any);
    // setGroup1ExternalNullifier(externalNullifier);
  };

  return (
    <div className="flex flex-col mb-20">
      <div className="w-full h-64">
        <div>Trapdoor: </div>
        <p>{trapdoor?.toString()}</p>
        <div className="pt-2">Nullifier: </div>
        <p>{nullifier?.toString()}</p>
        <div className="pt-2">Identity Commitment: </div>
        <p>{identityCommitment?.toString()}</p>
      </div>
      <button
        className="px-6 py-2
                text-sm text-white
                bg-indigo-500
                rounded-lg
                outline-none
                hover:bg-indigo-600
                ring-indigo-300
            "
        onClick={handleClickGenerateProof}
      >
        Generate Proof
      </button>
    </div>
  );
};
