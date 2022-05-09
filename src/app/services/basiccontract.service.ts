import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { Web3Service } from './web3.service'

const basicNFTArtifacts = require('../../../build/contracts/basicNFT.json');
const contract = require('@truffle/contract');

@Injectable({
  providedIn: 'root'
})
export class BasicContractService {

  basicNFT = contract(basicNFTArtifacts);

  constructor(
  	private web3Ser: Web3Service,
  	) {
  	// Use our web3 service as the provider for contract
  	this.basicNFT.setProvider(web3Ser.web3.currentProvider);
  }

  //get contract address
  async getAddress(): Promise<string> {
    let basic = await this.basicNFT.deployed();
    const contractaddr = basic.address;
    return contractaddr;
  }

  //get the owner's address of an NFT by token ID
  async getOwner(id: any): Promise<any> {
		let basic = await this.basicNFT.deployed();
    const value = await basic.ownerOf.call(id, {
      from: this.web3Ser.web3.eth.defaultAccount
    });
    return value;
	}

  //mint a coin to an address
	async mintCoin(to: any): Promise<any>{
    let basic = await this.basicNFT.deployed();
    const value = await basic.mint(to, {
      from: this.web3Ser.web3.eth.defaultAccount
    });
    return value;
	}

}
