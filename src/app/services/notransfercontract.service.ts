import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { Web3Service } from './web3.service'

const noTbasicNFTArtifacts = require('../../../build/contracts/noTransferbasicNFT.json');
const contract = require('@truffle/contract');

@Injectable({
  providedIn: 'root'
})
export class NotransfercontractService {

  noTransfer = contract(noTbasicNFTArtifacts);

  constructor( private web3Ser: Web3Service ) {
  	// Bootstrap the MetaCoin abstraction for Use
  	this.noTransfer.setProvider(web3Ser.web3.currentProvider);
  }

  async getAddress(): Promise<string> {
    let not = await this.noTransfer.deployed();
    const contractaddr = not.address;
    return contractaddr;
  }

  async getOwner(id: any): Promise<any> {
		let not = await this.noTransfer.deployed();
    const owner = await not.ownerOf.call(id, {
      from: this.web3Ser.web3.eth.defaultAccount
		});
	  return owner;
	}

	async mintCoin(to: any): Promise<any>{
		let not = await this.noTransfer.deployed();
    const value = await not.mint(to, {
      from: this.web3Ser.web3.eth.defaultAccount
    });
    return value;
	}

}
