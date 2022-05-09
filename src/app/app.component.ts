import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { Web3Service } from './services/web3.service'

//declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Mint An NFT!";
  constructor() {}
  ngOnInit(): void {}

}
