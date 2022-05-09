import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { Web3Service } from './web3.service'

const noTipfsNFTArtifacts = require('../../../build/contracts/noTransferIPFSNFT.json');
const contract = require('@truffle/contract');

@Injectable({
  providedIn: 'root'
})
export class NotransferipfscontractService {

  noTipfs = contract(noTipfsNFTArtifacts);

  constructor(private web3Ser: Web3Service) {
    this.noTipfs.setProvider(web3Ser.web3.currentProvider);
  }

  async getAddress(): Promise<string> {
    let not = await this.noTipfs.deployed();
    const contractaddr = not.address;
    return contractaddr;
  }

  async getOwner(id: any): Promise<any> {
    let not = await this.noTipfs.deployed();
    const owner = await not.ownerOf.call(id, {
      from: this.web3Ser.web3.eth.defaultAccount
    });
    return owner;
  }

  async getTokenUri(id: any): Promise<any> {
    let not = await this.noTipfs.deployed();
    const tokenURI = await not.tokenURI.call(id, {
      from: this.web3Ser.web3.eth.defaultAccount
    });
    return tokenURI;
  }

  async mintCoin(to: any, imagehash: string, metahash: string): Promise<any>{
    let not = await this.noTipfs.deployed();
    try{
      const value = await not.mint(to, imagehash, metahash, {
        from: this.web3Ser.web3.eth.defaultAccount
      });
      return value;
    }catch(err) {
    //alert("Error: An NFT has already been minted for this image");
    return null;
    }
  }

}
