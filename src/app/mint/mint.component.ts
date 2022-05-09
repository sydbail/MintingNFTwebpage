import { Component, HostListener, NgZone, OnInit, Input } from '@angular/core';
import { Web3Service } from '../services/web3.service';
//contract services
import { BasicContractService } from '../services/basiccontract.service';
import { IpfscontractService } from '../services/ipfscontract.service';
import { NotransfercontractService } from '../services/notransfercontract.service';
import { NotransferipfscontractService } from '../services/notransferipfscontract.service';

@Component({
  selector: 'app-mint',
  templateUrl: './mint.component.html',
  styleUrls: ['./mint.component.css']
})
export class MintComponent implements OnInit {
  @Input() filesList: any;
  @Input() userContract: any;
  window: any
  //metamask info
  account?: any;

  //contract
  metacontract?: boolean;
  contractAddress?: string;

  balance?: number;
  tokensMinted: number = 0;
  tokenID?: number;
  tokenURI?: any;
  recipientAddress?: string;
  finished: boolean = false;

  //form vars
  getID?: number;
  getownerID?: number;
  ownerAddr?: string;

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private basicService: BasicContractService,
    private ipfsconService: IpfscontractService,
    private ntbasicService: NotransfercontractService,
    private ntipfsService: NotransferipfscontractService
    ) {
    this.onReady();
    this.checkContract();
  }

  async onReady() {
    let accounts = await this.web3Service.getAccounts();
    this.account = accounts[0];
  }

  ngOnInit(): void {}

  async checkContract() {
    if (this.userContract == 'basicNFT'){
      this.metacontract = false;
    } else if (this.userContract == 'IPFSNFT'){
        this.metacontract = true;
    } else if (this.userContract == 'noTransferbasicNFT'){
        this.metacontract = false;
    } else {
        this.metacontract = true;
     }
  }

  async getOwner() {
    if(this.userContract == 'basicNFT'){
      const owner = await this.basicService.getOwner(this.getownerID);
      this.ownerAddr = owner;

   } else if (this.userContract == 'IPFSNFT'){
      const owner = await this.ipfsconService.getOwner(this.getownerID);
      this.ownerAddr = owner;

   } else if (this.userContract == 'noTransferbasicNFT'){
      const owner = await this.ntbasicService.getOwner(this.getownerID);
      this.ownerAddr = owner;

  } else {
      const owner = await this.ntipfsService.getOwner(this.getownerID)
      this.ownerAddr = owner;
    }
  }

 async mintCoin () {
    if(this.userContract == 'basicNFT'){
      for(let i=0; i < this.filesList.length; i++ ){
        const response = await this.basicService.mintCoin(this.account);
        this.contractAddress = response.logs[0].address;
        this.tokensMinted += 1;
        this.filesList[i].tokenID = response.logs[0].args.tokenId.toNumber();
      }
      this.finished = true;
    } else if (this.userContract == 'IPFSNFT'){
      for(let i=0; i < this.filesList.length; i++ ){
        const response = await this.ipfsconService.mintCoin(this.account, this.filesList[i].imghash, this.filesList[i].metaHash);
        if(response === null){
          alert("Error: An NFT has already been minted for this image!");
          this.filesList.splice(i,1,"Err");
          continue;
        }
        this.tokensMinted += 1;
        this.contractAddress = response.logs[0].address;
        this.filesList[i].tokenID = response.logs[0].args.tokenId.toNumber();
        this.filesList[i].tURI = await this.ipfsconService.getTokenUri(this.filesList[i].tokenID);
      }
      this.finished = true;
    } else if (this.userContract == 'noTransferbasicNFT'){
      for(let i=0; i < this.filesList.length; i++ ){
        const response = await this.ntbasicService.mintCoin(this.account);
        this.contractAddress = response.logs[0].address;
        this.tokensMinted += 1;
        this.filesList[i].tokenID = response.logs[0].args.tokenId.toNumber();
      }
      this.finished = true;
    } else {
      for(let i=0; i < this.filesList.length; i++ ){
        const response = await this.ntipfsService.mintCoin(this.account, this.filesList[i].imghash, this.filesList[i].metaHash);
        if(response === null){
          alert("Error: An NFT has already been minted for this image!");
          this.filesList.splice(i,1, "Err");
          continue;
        }
        this.contractAddress = response.logs[0].address;
        this.tokensMinted += 1;
        this.filesList[i].tokenID = response.logs[0].args.tokenId.toNumber();
        this.filesList[i].tURI = await this.ipfsconService.getTokenUri(this.filesList[i].tokenID);
      }
      this.finished = true;
    }
  }//end mint coin

  //METADATA ONLY contracts
  async getURI(tID: any) {
    if(this.userContract == 'IPFSNFT'){
      const tokenURI = await this.ipfsconService.getTokenUri(tID);
      this.tokenURI = tokenURI;
    } else if(this.userContract == 'noTransferIPFSNFT') {
      const tokenURI = await this.ntipfsService.getTokenUri(tID);
      this.tokenURI = tokenURI;
    } else {
      alert("Your tokens do not contain Metadata");
    }
  }

}
