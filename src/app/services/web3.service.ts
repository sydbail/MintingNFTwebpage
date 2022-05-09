import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
//enviroment variables, provides localhost:8545 as provider for HTTP
import { environment } from '../../environments/environment';

const Web3 = require('web3');
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  public web3: any;

  constructor() {
  	this.checkAndInstantiateWeb3();
  }

  async checkAndInstantiateWeb3() {
    if (window.ethereum) {
       this.web3 = new Web3(window.ethereum);
       //TODO: check alternative for enable
       await window.ethereum.enable();
   } else if (window.web3) {
       this.web3 = new Web3(window.web3.currentProvider);
       await window.ethereum.enable();
   } else {
       window.alert('Non-Ethereum browser detected. Please install MetaMask plugin');
   }
  }

  async getAccounts(): Promise<any>{
    let accounts = await this.web3.eth.getAccounts();
    this.web3.eth.defaultAccount = accounts[0];
    return accounts;
  }

}
