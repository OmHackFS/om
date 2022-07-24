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
      const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(str)
  
      const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
        accessControlConditions: accessControlConditions,
        symmetricKey,
        authSig,
        chain,
      })
  
      return {
        encryptedFile: encryptedString,
        encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
      }
    }

    async encryptFile(file: string, accessControlConditions: any, chain: string) {
        if (!this.litNodeClient) {
            await this.connect()
          }
          const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
          const { encryptedString, symmetricKey } = await LitJsSdk.zipAndEncryptFiles([file])
      
          const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
            accessControlConditions: accessControlConditions,
            symmetricKey,
            authSig,
            chain,
          })
      
          return {
            encryptedFile: encryptedString,
            encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
          }
    }
  
    async decryptString(encryptedStr:string, encryptedSymmetricKey:string, accessControlConditions:any, chain:string) {
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
      const decryptedFile = await LitJsSdk.decryptString(
        encryptedStr,
        symmetricKey
      );
      // eslint-disable-next-line no-console
      console.log({
        decryptedFile
      })
      return { decryptedFile }
    }

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
        console.log({
          decryptedFile
        })
        return { decryptedFile }
      }
  }

  export default new Lit()