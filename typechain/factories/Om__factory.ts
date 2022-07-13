/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Om, OmInterface } from "../Om";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_treeDepth",
        type: "uint8",
      },
      {
        internalType: "contract IVerifier",
        name: "_verifier",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "daoName",
        type: "bytes32",
      },
    ],
    name: "DaoCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "depth",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "zeroValue",
        type: "uint256",
      },
    ],
    name: "GroupCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
    ],
    name: "MemberAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
    ],
    name: "MemberAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
    ],
    name: "MemberRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
    ],
    name: "MemberRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
    ],
    name: "NullifierHashAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "proposalName",
        type: "bytes32",
      },
    ],
    name: "ProposalCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "signal",
        type: "bytes32",
      },
    ],
    name: "VoteCast",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256",
      },
    ],
    name: "addMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "vote",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]",
      },
    ],
    name: "castVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "daoName",
        type: "bytes32",
      },
    ],
    name: "createDao",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "proposalName",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]",
      },
    ],
    name: "createProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "daoGroups",
    outputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "members",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nextProposal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votesToPass",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
    ],
    name: "getDepth",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
    ],
    name: "getNumberOfLeaves",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
    ],
    name: "getRoot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalsPerGroup",
    outputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votesUp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votesDown",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "passed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "proofSiblings",
        type: "uint256[]",
      },
      {
        internalType: "uint8[]",
        name: "proofPathIndices",
        type: "uint8[]",
      },
    ],
    name: "removeMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treeDepth",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verifier",
    outputs: [
      {
        internalType: "contract IVerifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002115380380620021158339818101604052810190620000379190620000c9565b81600260006101000a81548160ff021916908360ff16021790555080600260016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505062000193565b600081519050620000ac816200015f565b92915050565b600081519050620000c38162000179565b92915050565b60008060408385031215620000dd57600080fd5b6000620000ed85828601620000b2565b925050602062000100858286016200009b565b9150509250929050565b6000620001178262000132565b9050919050565b60006200012b826200010a565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600060ff82169050919050565b6200016a816200011e565b81146200017657600080fd5b50565b620001848162000152565b81146200019057600080fd5b50565b611f7280620001a36000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806366462e3d1161007157806366462e3d1461017c57806374cab8451461019857806375e618c9146101b45780639b24b3b0146101e4578063ac05083a14610214578063b9c78c2b14610247576100b4565b806316a56c41146100b95780631783efc3146100d75780631edf0a73146100f35780632b7ac3f31461012657806343989f851461014457806347df85bb14610160575b600080fd5b6100c1610277565b6040516100ce9190611a78565b60405180910390f35b6100f160048036038101906100ec91906112bc565b61028a565b005b61010d600480360381019061010891906112bc565b610368565b60405161011d9493929190611a33565b60405180910390f35b61012e6103b2565b60405161013b9190611834565b60405180910390f35b61015e600480360381019061015991906112f8565b6103d8565b005b61017a60048036038101906101759190611244565b6104be565b005b610196600480360381019061019191906111b7565b610554565b005b6101b260048036038101906101ad919061118e565b6106ad565b005b6101ce60048036038101906101c9919061121b565b6107d9565b6040516101db9190611a78565b60405180910390f35b6101fe60048036038101906101f9919061121b565b610806565b60405161020b91906119c6565b60405180910390f35b61022e6004803603810190610229919061121b565b610826565b60405161023e949392919061178d565b60405180910390f35b610261600480360381019061025c919061121b565b610876565b60405161026e91906119c6565b60405180910390f35b600260009054906101000a900460ff1681565b6003600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461032e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103259061188f565b60405180910390fd5b6103388282610896565b60036000838152602001908152602001600020600101600081548092919061035f90611cc1565b91905055505050565b6004602052816000526040600020602052806000526040600020600091509150508060000154908060010154908060020154908060030160009054906101000a900460ff16905084565b600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6003600087815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461047c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610473906118cf565b60405180910390fd5b61048a8686868686866109ae565b6003600087815260200190815260200160002060010160008154809291906104b190611c97565b9190505550505050505050565b6000600160008481526020019081526020016000206001015490506105098582868686600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610ad2565b61051284610e2b565b827f96c313364ec07441c94195f44ed1e5f2656059c98a7c0c68466dac90c6fd8bf987876040516105449291906119e1565b60405180910390a2505050505050565b60006001600084815260200190815260200160002060010154905061059f8582868686600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610ad2565b6105a7611035565b6000600360008681526020019081526020016000206002015490506064436105cf9190611baf565b8260000181815250508160046000878152602001908152602001600020600083815260200190815260200160002060008201518160000155602082015181600101556040820151816002015560608201518160030160006101000a81548160ff02191690831515021790555090505060036000868152602001908152602001600020600201600081548092919061066590611cc1565b9190505550847fcb8e75414e8ce6fbc0576f05fa1fb29c2ef16ee7fda35c7414889779d8286dae828960405161069c9291906119e1565b60405180910390a250505050505050565b60006106b882610e59565b90506106d581600260009054906101000a900460ff166000610e90565b6106dd61105f565b33816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506001816040018181525050806003600084815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015560608201518160030155905050817f90b49a3957a38a3d5e938dae87285886d0963bffacce56612f54960948493d32846040516107cc9190611819565b60405180910390a2505050565b60006001600083815260200190815260200160002060000160009054906101000a900460ff169050919050565b600060016000838152602001908152602001600020600101549050919050565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154905084565b600060016000838152602001908152602001600020600201549050919050565b60006108a1836107d9565b60ff1614156108e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108dc906118af565b60405180910390fd5b6001600083815260200190815260200160002073__$4c0484323457fe1a856f46a4759b553fe4$__63168703fa9091836040518363ffffffff1660e01b815260040161093292919061190f565b60006040518083038186803b15801561094a57600080fd5b505af415801561095e573d6000803e3d6000fd5b50505050600061096d83610806565b9050827f03fd27265b7dd1f55558bedc22a58fa3b10afb1be776e614bd5a7ba7b949940683836040516109a1929190611a0a565b60405180910390a2505050565b60006109b9876107d9565b60ff1614156109fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f4906118af565b60405180910390fd5b6001600087815260200190815260200160002073__$4c0484323457fe1a856f46a4759b553fe4$__630629596f909187878787876040518763ffffffff1660e01b8152600401610a5296959493929190611938565b60006040518083038186803b158015610a6a57600080fd5b505af4158015610a7e573d6000803e3d6000fd5b505050506000610a8d87610806565b9050867fe270325ded177064d7bda473e6519ef40a291058c41286f71a6e4872f1e9ab5c8783604051610ac1929190611a0a565b60405180910390a250505050505050565b60008085815260200190815260200160002060009054906101000a900460ff1615610b32576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b299061184f565b60405180910390fd5b6000610b3d87610ffe565b90508173ffffffffffffffffffffffffffffffffffffffff16635fe8c13b604051806040016040528086600060088110610ba0577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020135815260200186600160088110610be4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200201358152506040518060400160405280604051806040016040528089600260088110610c3c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020135815260200189600360088110610c80577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200201358152508152602001604051806040016040528089600460088110610cd2577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020135815260200189600560088110610d16577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020135815250815250604051806040016040528088600660088110610d66577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020135815260200188600760088110610daa577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002013581525060405180608001604052808c81526020018b81526020018781526020018a8152506040518563ffffffff1660e01b8152600401610df294939291906117d2565b60006040518083038186803b158015610e0a57600080fd5b505afa158015610e1e573d6000803e3d6000fd5b5050505050505050505050565b600160008083815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6000600882604051602001610e6e9190611772565b6040516020818303038152906040528051906020012060001c901c9050919050565b7f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018310610ef2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ee9906118ef565b60405180910390fd5b6000610efd846107d9565b60ff1614610f40576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f379061186f565b60405180910390fd5b6001600084815260200190815260200160002073__$4c0484323457fe1a856f46a4759b553fe4$__63b4bdd117909184846040518463ffffffff1660e01b8152600401610f8f9392919061198f565b60006040518083038186803b158015610fa757600080fd5b505af4158015610fbb573d6000803e3d6000fd5b50505050827fc3082aa494e9088c2c9f0fb62a0b6bd46e6699acb94cfba35be29b95a93f68c88383604051610ff1929190611a93565b60405180910390a2505050565b60006008826040516020016110139190611772565b6040516020818303038152906040528051906020012060001c901c9050919050565b60405180608001604052806000815260200160008152602001600081526020016000151581525090565b6040518060800160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600081525090565b6000819050826020600802820111156110b557600080fd5b92915050565b60008083601f8401126110cd57600080fd5b8235905067ffffffffffffffff8111156110e657600080fd5b6020830191508360208202830111156110fe57600080fd5b9250929050565b60008083601f84011261111757600080fd5b8235905067ffffffffffffffff81111561113057600080fd5b60208301915083602082028301111561114857600080fd5b9250929050565b60008135905061115e81611ef7565b92915050565b60008135905061117381611f0e565b92915050565b60008135905061118881611f25565b92915050565b6000602082840312156111a057600080fd5b60006111ae8482850161114f565b91505092915050565b60008060008061016085870312156111ce57600080fd5b60006111dc8782880161114f565b94505060206111ed87828801611164565b93505060406111fe87828801611164565b925050606061120f8782880161109d565b91505092959194509250565b60006020828403121561122d57600080fd5b600061123b84828501611164565b91505092915050565b6000806000806000610180868803121561125d57600080fd5b600061126b88828901611164565b955050602061127c8882890161114f565b945050604061128d88828901611164565b935050606061129e88828901611164565b92505060806112af8882890161109d565b9150509295509295909350565b600080604083850312156112cf57600080fd5b60006112dd85828601611164565b92505060206112ee85828601611164565b9150509250929050565b6000806000806000806080878903121561131157600080fd5b600061131f89828a01611164565b965050602061133089828a01611164565b955050604087013567ffffffffffffffff81111561134d57600080fd5b61135989828a016110bb565b9450945050606087013567ffffffffffffffff81111561137857600080fd5b61138489828a01611105565b92509250509295509295509295565b600061139f8383611441565b60408301905092915050565b60006113b78383611718565b60208301905092915050565b60006113cf8383611763565b60208301905092915050565b6113e481611c05565b82525050565b6113f381611ae4565b6113fd8184611b39565b925061140882611abc565b8060005b838110156114395781516114208782611393565b965061142b83611b05565b92505060018101905061140c565b505050505050565b61144a81611aef565b6114548184611b44565b925061145f82611ac6565b8060005b8381101561149057815161147787826113ab565b965061148283611b12565b925050600181019050611463565b505050505050565b6114a181611aef565b6114ab8184611b4f565b92506114b682611ac6565b8060005b838110156114e75781516114ce87826113ab565b96506114d983611b12565b9250506001810190506114ba565b505050505050565b6114f881611afa565b6115028184611b5a565b925061150d82611ad0565b8060005b8381101561153e57815161152587826113ab565b965061153083611b1f565b925050600181019050611511565b505050505050565b60006115528385611b65565b93507f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83111561158157600080fd5b602083029250611592838584611c88565b82840190509392505050565b60006115aa8385611b76565b93506115b582611ada565b8060005b858110156115ee576115cb8284611b98565b6115d588826113c3565b97506115e083611b2c565b9250506001810190506115b9565b5085925050509392505050565b61160481611c17565b82525050565b61161381611c23565b82525050565b61162a61162582611c23565b611d0a565b82525050565b61163981611c64565b82525050565b600061164c603683611b87565b915061165782611d43565b604082019050919050565b600061166f602583611b87565b915061167a82611d92565b604082019050919050565b6000611692602083611b87565b915061169d82611de1565b602082019050919050565b60006116b5602583611b87565b91506116c082611e0a565b604082019050919050565b60006116d8602383611b87565b91506116e382611e59565b604082019050919050565b60006116fb603683611b87565b915061170682611ea8565b604082019050919050565b8082525050565b61172181611c4d565b82525050565b61173081611c4d565b82525050565b61173f81611c4d565b82525050565b61174e81611c57565b82525050565b61175d81611c57565b82525050565b61176c81611c57565b82525050565b600061177e8284611619565b60208201915081905092915050565b60006080820190506117a260008301876113db565b6117af6020830186611727565b6117bc6040830185611727565b6117c96060830184611727565b95945050505050565b6000610180820190506117e86000830187611498565b6117f560408301866113ea565b61180260c0830185611498565b6118106101008301846114ef565b95945050505050565b600060208201905061182e600083018461160a565b92915050565b60006020820190506118496000830184611630565b92915050565b600060208201905081810360008301526118688161163f565b9050919050565b6000602082019050818103600083015261188881611662565b9050919050565b600060208201905081810360008301526118a881611685565b9050919050565b600060208201905081810360008301526118c8816116a8565b9050919050565b600060208201905081810360008301526118e8816116cb565b9050919050565b60006020820190508181036000830152611908816116ee565b9050919050565b60006040820190506119246000830185611711565b6119316020830184611736565b9392505050565b600060808201905061194d6000830189611711565b61195a6020830188611736565b818103604083015261196d818688611546565b9050818103606083015261198281848661159e565b9050979650505050505050565b60006060820190506119a46000830186611711565b6119b16020830185611754565b6119be6040830184611736565b949350505050565b60006020820190506119db6000830184611727565b92915050565b60006040820190506119f66000830185611727565b611a03602083018461160a565b9392505050565b6000604082019050611a1f6000830185611727565b611a2c6020830184611727565b9392505050565b6000608082019050611a486000830187611727565b611a556020830186611727565b611a626040830185611727565b611a6f60608301846115fb565b95945050505050565b6000602082019050611a8d6000830184611745565b92915050565b6000604082019050611aa86000830185611745565b611ab56020830184611727565b9392505050565b6000819050919050565b6000819050919050565b6000819050919050565b6000819050919050565b600060029050919050565b600060029050919050565b600060049050919050565b6000602082019050919050565b6000602082019050919050565b6000602082019050919050565b6000602082019050919050565b600081905092915050565b600081905092915050565b600081905092915050565b600081905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000611ba76020840184611179565b905092915050565b6000611bba82611c4d565b9150611bc583611c4d565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611bfa57611bf9611d14565b5b828201905092915050565b6000611c1082611c2d565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b6000611c6f82611c76565b9050919050565b6000611c8182611c2d565b9050919050565b82818337600083830152505050565b6000611ca282611c4d565b91506000821415611cb657611cb5611d14565b5b600182039050919050565b6000611ccc82611c4d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611cff57611cfe611d14565b5b600182019050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f53656d6170686f7265436f72653a20796f752063616e6e6f742075736520746860008201527f652073616d65206e756c6c696669657220747769636500000000000000000000602082015250565b7f53656d6170686f726547726f7570733a2067726f757020616c7265616479206560008201527f7869737473000000000000000000000000000000000000000000000000000000602082015250565b7f4f6e6c792067726f75702061646d696e206d617920616464206d656d62657273600082015250565b7f53656d6170686f726547726f7570733a2067726f757020646f6573206e6f742060008201527f6578697374000000000000000000000000000000000000000000000000000000602082015250565b7f4f6e6c792067726f75702061646d696e206d61792072656d6f7665206d656d6260008201527f6572730000000000000000000000000000000000000000000000000000000000602082015250565b7f53656d6170686f726547726f7570733a2067726f7570206964206d757374206260008201527f65203c20534e41524b5f5343414c41525f4649454c4400000000000000000000602082015250565b611f0081611c23565b8114611f0b57600080fd5b50565b611f1781611c4d565b8114611f2257600080fd5b50565b611f2e81611c57565b8114611f3957600080fd5b5056fea264697066735822122017798dc5cbbf7f0ea9e5b658099726181ed1d28669ce1ced373684118301cb8064736f6c63430008040033";

type OmConstructorParams =
  | [linkLibraryAddresses: OmLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OmConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class Om__factory extends ContractFactory {
  constructor(...args: OmConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(_abi, Om__factory.linkBytecode(linkLibraryAddresses), signer);
    }
  }

  static linkBytecode(linkLibraryAddresses: OmLibraryAddresses): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$4c0484323457fe1a856f46a4759b553fe4\\$__", "g"),
      linkLibraryAddresses[
        "@zk-kit/incremental-merkle-tree.sol/contracts/IncrementalBinaryTree.sol:IncrementalBinaryTree"
      ]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  deploy(
    _treeDepth: BigNumberish,
    _verifier: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Om> {
    return super.deploy(_treeDepth, _verifier, overrides || {}) as Promise<Om>;
  }
  getDeployTransaction(
    _treeDepth: BigNumberish,
    _verifier: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_treeDepth, _verifier, overrides || {});
  }
  attach(address: string): Om {
    return super.attach(address) as Om;
  }
  connect(signer: Signer): Om__factory {
    return super.connect(signer) as Om__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OmInterface {
    return new utils.Interface(_abi) as OmInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Om {
    return new Contract(address, _abi, signerOrProvider) as Om;
  }
}

export interface OmLibraryAddresses {
  ["@zk-kit/incremental-merkle-tree.sol/contracts/IncrementalBinaryTree.sol:IncrementalBinaryTree"]: string;
}
