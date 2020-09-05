import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
let Accounts = require('web3-eth-accounts');
let accounts = new Accounts()

async function start() {
  let mnemonic = ""
  let msg = "Pay ACUs to the Acuity account:"
  let node = bip32.fromSeed(await bip39.mnemonicToSeed(mnemonic))

  let path = "m/44'/76'/0'/0" // coinomi
  let privateKey: string = '0x' + node.derivePath(path).privateKey!.toString('hex')
  let account = accounts.privateKeyToAccount(privateKey)

  let out = {
    address: account.address,
    msg: msg,
    sig: accounts.sign(msg, privateKey).signature,
    version: "2",
  }

  console.log(JSON.stringify(out))
}

start()
