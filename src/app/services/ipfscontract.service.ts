import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { Web3Service } from './web3.service'

const ipfsNFTArtifacts = require('../../../build/contracts/IPFSNFT.json');
const contract = require('@truffle/contract');

@Injectable({
  providedIn: 'root'
})
export class IpfscontractService {

  ipfsNFT = contract(ipfsNFTArtifacts);

  constructor(private web3Ser: Web3Service) {
    this.ipfsNFT.setProvider(web3Ser.web3.currentProvider);
  }

  async getAddress(): Promise<string> {
    let ipfscontract = await this.ipfsNFT.deployed();
    const contractaddr = ipfscontract.address;
    return contractaddr;
  }

  async getOwner(id: any): Promise<any> {
    let ipfscontract = await this.ipfsNFT.deployed();
    const owner = await ipfscontract.ownerOf.call(id, {
      from: this.web3Ser.web3.eth.defaultAccount
    });
    return owner;
  }

  async getTokenUri(id: any): Promise<any> {

    let ipfscontract = await this.ipfsNFT.deployed();
    const tokenURI = await ipfscontract.tokenURI.call(id, {
      from: this.web3Ser.web3.eth.defaultAccount
    });
    return tokenURI;
  }

  async mintCoin(to: any, imagehash: string, metahash: string): Promise<any>{
    let ipfscontract = await this.ipfsNFT.deployed();
    try {
      const value = await ipfscontract.mint(to, imagehash, metahash, {
        from: this.web3Ser.web3.eth.defaultAccount
      });
      return value;
    }catch(err) {
      return null;
    }
  }

}
