import { useMemo, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";
import Semaphore from "../pages/utils/Semaphore.json";
import * as ethUtil from "ethereumjs-util";
import * as sigUtil from "@metamask/eth-sig-util";
// const { Blob } =  require('nft.storage');
// import * as nftStorage from "nft.storage";
import { ethers, Signer } from "ethers";
import OmSbToken from "../artifacts/contracts/OmSbToken.sol/OmSbToken.json";

// console.log(nftStorage.NFTStorage)
// import * as ipfsCar from 'ipfs-car/pack';
// import {IPFS} from 'ipfs';
// import * as fs from 'fs';

import { AbstractConnector } from "@web3-react/abstract-connector";
import { Provider } from "../utils/provider";
import { injected } from "../utils/connectors";

const sbContractAddr = "0xDAA40151080Be453A9918dc9CcE4BC3160f892CE";

export const SendTransactionBody = () => {
  const context = useWeb3React<Provider>();
  const { activate, active, account, library } = context;

  const [signer, setSigner] = useState<Signer>();
  const [signerAddr, setSignerAddr] = useState<string | null>(null);
  const [encryptedIdData, setEncryptedIdData] = useState();
  const [idData, setIdData] = useState();
  const [message,setMessage] = useState();
  

  const OmSbTokenContract = useMemo(() => {
    return new ethers.Contract(sbContractAddr, OmSbToken.abi, signer);
  }, [signer]);

  useEffect((): void => {
    if (!library) {
      setSigner(undefined);
      return;
    }

    const signer = library.getSigner();
    setSigner(signer);
    signer.getAddress().then(setSignerAddr);
  }, [library]);

  const handleEncryptData = async (e: any) => {
    e.preventDefault();

    const accounts = await (window as any).ethereum.request({
      method:'eth_requestAccounts',
    });
    const account1 = accounts[0];

    const newId = new Identity();
    const IdTrapdoor = newId.getTrapdoor();
    const IdNullifer = newId.getNullifier();
    const IdCommitment = newId.generateCommitment();

    const idData = {
      newId: newId.toString(),
      IdTrapdoor: IdTrapdoor.toString(),
      IdNullifer: IdNullifer.toString(),
      IdCommitment: IdCommitment.toString(),
    }

    const stringIdData = JSON.stringify(idData);


    const encryptionPublicKey = await (window as any).ethereum.request({
      method: "eth_getEncryptionPublicKey",
      params: [account1],
    });

    // console.log("encryptionPublicKey ", encryptionPublicKey, ethUtil);
    // console.log("data ", idData.toString());
    // console.log("idData2")
    // console.log(idData2)
    // console.log("idData3")
    // console.log(idData3)

    const newEncryptedIdData = ethUtil.bufferToHex(
      Buffer.from(
        JSON.stringify(
          sigUtil.encrypt({
            publicKey: encryptionPublicKey,
            data: stringIdData,
            version: "x25519-xsalsa20-poly1305",
          })
        ),
        "utf8"
      )
    );

    setEncryptedIdData(newEncryptedIdData as any);
    console.log("Encrypted Data Hash");      
    console.log(newEncryptedIdData);
    console.log("Encrypted Data Id");      
    console.log(stringIdData);
  };

//   const storeNftStorageToken = async () => {
//     console.log("nftStorage ");

//     const NFT_STORAGE_TOKEN =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIzZDg1OTczYUU3ZTI1RTdlMTNEZEUwZDhmQzIwMzgwQTQ0NDc4NUIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzU4Mzg2OTU5MywibmFtZSI6IkhhY2tGUyJ9.ldx5AlCgYy2cGrgXOpTPVd2xA68SHcU4_of9MsNmEIw";
//     const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
//     const IPFSdata = new Blob([encryptedIdTrapdoor as any]);
//     const cid = await client.storeBlob(IPFSdata);

//     const dataFromIPFS = await fetch(`https://ipfs.io/ipfs/${cid}`);

//     console.log("IPFS Address");
//     console.log(cid);
//     console.log(idTrapdoor);
//     console.log(encryptedIdTrapdoor);

//     console.log("Data Fetched from IPFS");
//     console.log(dataFromIPFS);
//   }

  async function connectWallet(){
    const accounts = await (window as any).ethereum.request({
      method:'eth_requestAccounts',
    });
    const address = accounts[0];
    setSigner(address);

  }

  const handleDecryptData = async (e: any) => {
    e.preventDefault();

    const accounts = await (window as any).ethereum.request({
      method:'eth_requestAccounts',
    });
    const account1 = accounts[0];

    const decryptedMessage = await (window as any).ethereum.request({
      method: "eth_decrypt",
      params: [encryptedIdData, account1],
    });
    const stringMessage =decryptedMessage.toString()
    const jsonMessage = JSON.parse(decryptedMessage);
    setMessage(stringMessage);
    // const stringMessage2 =decryptedMessage.json();

    console.log("Decrypted Message");
    console.log(decryptedMessage);
    console.log("IdTrapdoor");
    const idTest = jsonMessage.IdTrapdoor;
    console.log(parseInt(idTest));

  };

  const handleMintToken = async (e: any) => {
    e.preventDefault();

    const mintedTokenTx = await OmSbTokenContract.connect(signer as any).safeMint(account)

    await mintedTokenTx.wait()

    console.log('mintedToken ', mintedTokenTx)
  };

  console.log("context ", context);
  return (
    <div className="flex flex-col">
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={handleEncryptData} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Encrypt data</button>
      <button onClick={handleDecryptData} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Decrypt data</button>
      <button onClick={handleMintToken} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Mint Token</button>
      <p>{encryptedIdData}</p>
    </div>
  );
};
