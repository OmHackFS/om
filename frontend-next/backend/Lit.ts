import * as LitJsSdk from "lit-js-sdk";

class Lit {
    litNodeClient: any
  
    async connect() {
      const client = new LitJsSdk.LitNodeClient()
      await client.connect()
      this.litNodeClient = client
    }
  
    async encryptString(str: string, accessControlConditions: any, chain: string) {
      if (!this.litNodeClient) {
        await this.connect()
      }
      const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
      const { encryptedZip, symmetricKey } = await LitJsSdk.zipAndEncryptString(str)
  
      const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
        accessControlConditions: accessControlConditions,
        symmetricKey,
        authSig,
        chain,
      })
  
      return {
        encryptedZip: encryptedZip,
        encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
      }
    }

    async encryptFile(file: string, accessControlConditions: any, chain: string) {
        if (!this.litNodeClient) {
            await this.connect()
          }

          // console.log("File to be encrypted: ", [file])

          const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
          const { encryptedZip, symmetricKey } = await LitJsSdk.zipAndEncryptFiles([file])
      
          const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
            accessControlConditions: accessControlConditions,
            symmetricKey,
            authSig,
            chain,
          })
          
          // console.log("Encrypted zip:", encryptedZip)
      
          return {
            encryptedZip: encryptedZip,
            encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
          }
    }
  
    // async decryptString(encryptedStr:string, encryptedSymmetricKey:string, accessControlConditions:any, chain:string) {
    //   if (!this.litNodeClient) {
    //     await this.connect()
    //   }
    //   const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
    //   const symmetricKey = await this.litNodeClient.getEncryptionKey({
    //     accessControlConditions: accessControlConditions,
    //     toDecrypt: encryptedSymmetricKey,
    //     chain,
    //     authSig
    //   })
    //   const decryptedFile = await LitJsSdk.decryptString(
    //     encryptedStr,
    //     symmetricKey
    //   );
    //   // eslint-disable-next-line no-console
    //   console.log({
    //     decryptedFile
    //   })
    //   return { decryptedFile }
    // }

    async decryptFile(encryptedFile:Blob, encryptedSymmetricKey:string, accessControlConditions:any, chain:string) {
        if (!this.litNodeClient) {
          await this.connect()
        }
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
        const symmetricKey = await this.litNodeClient.getEncryptionKey({
          accessControlConditions: accessControlConditions,
          toDecrypt: encryptedSymmetricKey,
          chain,
          authSig
        })

        const decryptedFile = await LitJsSdk.decryptZip(
          encryptedFile,
          symmetricKey
        );
        // eslint-disable-next-line no-console
        console.log("Decrypted file: ", {
          decryptedFile
        })
        return { decryptedFile } // https://lit-protocol.github.io/lit-js-sdk/api_docs_html/#decryptzip See docs to understand how to use this
      }
  }

  export default new Lit()