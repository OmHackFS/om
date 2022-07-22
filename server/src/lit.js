// import LitJsSdk from 'lit-js-sdk'

// const client = new LitJsSdk.LitNodeClient()
// const chain = 'mumbai'
// const standardContractType = 'ERC721'

// const hexStringToArrayBuffer = (hexString) => {
//     hexString = hexString.replace(/^0x/, '');
//     if (hexString.length % 2 != 0) {
//       // eslint-disable-next-line no-console
//       console.log('WARNING: expecting an even number of characters in the hexString');
//     }
//     const bad = hexString.match(/[G-Z\s]/i);
//     if (bad) {
//       // eslint-disable-next-line no-console
//       console.log('WARNING: found non-hex characters', bad);
//     }
//     const pairs = hexString.match(/[\dA-F]{2}/gi);
//     const integers = pairs.map(function (s) {
//       return parseInt(s, 16);
//     });
//     const array = new Uint8Array(integers);
//     return array.buffer;
//   }

//   class Lit {
//     constructor() {
//       this.litNodeClient = null
//     } 
  
//     async connect() {
//       await client.connect()
//       this.litNodeClient = client
//     }
  
//     async encrypt(message, tokenAddress) {
//       if (!this.litNodeClient) {
//         await this.connect()
//       }
  
//       const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
//       const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message)
//       const accessControlConditions = [
//         {
//           contractAddress: tokenAddress,
//           standardContractType,
//           chain,
//           method: 'balanceOf',
//           parameters: [
//             ':userAddress'
//           ],
//           returnValueTest: {
//             comparator: '>',
//             value: '0'
//           }
//         }
//       ]
//       const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
//         accessControlConditions,
//         symmetricKey,
//         authSig,
//         chain,
//       })
//       // eslint-disable-next-line no-console
//       console.log({
//         // encryptedString: Buffer.from(await encryptedString.arrayBuffer()).toString('hex'),
//         encryptedString: await encryptedString.arrayBuffer(),
//         encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
//       })
//       return {
//         encryptedString: Buffer.from(await encryptedString.arrayBuffer()).toString('hex'),
//         // encryptedString: await encryptedString.arrayBuffer(),
//         encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
//       }
//     }
  
//     async decrypt(encryptedString, encryptedSymmetricKey, tokenAddress) {
//       if (!this.litNodeClient) {
//         await this.connect()
//       }
  
//       const accessControlConditions = [
//         {
//           contractAddress: tokenAddress,
//           standardContractType,
//           chain,
//           method: 'balanceOf',
//           parameters: [
//             ':userAddress'
//           ],
//           returnValueTest: {
//             comparator: '>',
//             value: '0'
//           }
//         }
//       ]
//       const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
//       const symmetricKey = await this.litNodeClient.getEncryptionKey({
//         accessControlConditions,
//         // Note, below we convert the encryptedSymmetricKey from a UInt8Array to a hex string.  This is because we obtained the encryptedSymmetricKey from "saveEncryptionKey" which returns a UInt8Array.  But the getEncryptionKey method expects a hex string.
//         toDecrypt: encryptedSymmetricKey,
//         chain,
//         authSig
//       })
//       const decryptedString = await LitJsSdk.decryptString(
//         new Blob([hexStringToArrayBuffer(encryptedString)]), // hexStringToArrayBuffer(encryptedString),
//         symmetricKey
//       );
//       // eslint-disable-next-line no-console
//       console.log({
//         decryptedString
//       })
//       return { decryptedString }
//     }
//   }
  
//   export default new Lit()

import LitJsSdk from "lit-js-sdk/build/index.node.js";
import { DID } from 'dids'
import { Integration } from 'lit-ceramic-sdk'

const CHAIN = "ethereum";
const ACCESS_CONTROL_CONDITIONS = [
  {
    contractAddress: "0x7C7757a9675f06F3BE4618bB68732c4aB25D2e88",
    functionName: "balanceOf",
    functionParams: [":userAddress", "8"],
    functionAbi: {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      name: "balanceOf",
      inputs: [
        {
          type: "address",
          name: "account",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "id",
          internalType: "uint256",
        },
      ],
    },
    CHAIN,
    returnValueTest: {
      key: "",
      comparator: ">",
      value: "0",
    },
  },
];
// Get the authSig from some wallet
const AUTH_SIG = {
  sig: "0x39a3d6f2bedb5ef51442069d3c721596328ef50f81a3a0c0339c2acaade8bd721fea5cce0dc4acb6958cd40fddd680fb35c1fbd07fa95c7e657f5e6f154ed7fc1b",
  derivedVia: "web3.eth.personal.sign",
  signedMessage:
    "I am creating an account to use Lit Protocol at 2022-01-10T20:47:35.692Z",
  address: "0xfff175c14a299ef7027da0d348f438e154880ccd",
};

let litCeramicIntegration = new Integration('https://ceramic-clay.3boxlabs.com', 'polygon')
let streamID = 'kjzl6cwe1jw1479rnblkk5u43ivxkuo29i4efdx1e7hk94qrhjl0d4u0dyys1au' // test data



async function litStore(resourceBaseUrl, resourcePath) {

  const resourceId = {
    baseUrl: resourceBaseUrl,// "my-dynamic-content-server.com",
    path: resourcePath, // "/1234",
    orgId: "",
    role: "",
    extraData: "",
  };

  app.locals.litNodeClient.

  await app.locals.litNodeClient.saveSigningCondition({
    ACCESS_CONTROL_CONDITIONS,
    CHAIN,
    AUTH_SIG,
    resourceId,
  });

  console.log("saved resource")

}

async function litRetrieveAndVerify(resourceBaseUrl, resourcePath) {
  const resourceId = {
    baseUrl: resourceBaseUrl,// "my-dynamic-content-server.com",
    path: resourcePath, // "/1234",
    orgId: "",
    role: "",
    extraData: "",
  };

  const jwt = await app.locals.litNodeClient.getSignedToken({
    ACCESS_CONTROL_CONDITIONS,
    CHAIN,
    AUTH_SIG,
    resourceId,
  });

  console.log("Got jwt", jwt);

  // verify the JWT
  const { verified, header, payload } = LitJsSdk.verifyJwt({ jwt });
  if (
    !verified ||
    payload.baseUrl !== "my-dynamic-content-server.com" ||
    payload.path !== "/1234" ||
    payload.orgId !== "" ||
    payload.role !== "" ||
    payload.extraData !== ""
  ) {
    // Reject this request!
    res.send("Error!  The JWT is invalid!");
  }

  console.log("Jwt is valid", jwt);
}

export {litRetrieveAndVerify as default, litStore} 
