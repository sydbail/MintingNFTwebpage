# NFT Minting Webpage

A webpage I wrote to learn how to work with the Ethereum blockchain and writing smart contracts. Uses the Truffle Suite Ganache personal blockchain. Allows you to mint an NFT associated with an image to a Metamask wallet. Allows the option to include IPFS metadata or create a non-transferable NFT.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.

## Prerequisites

* Google Chrome Browser
* [Metamask browser plug-in](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
* [Ganache Blockchain](https://trufflesuite.com/ganache/)
* Enough Ether to complete transactions

## Installation and Running example
First, to set up MetaMask, install the associated plugin to your browser and the Ganache Blockchain. Next, log into Metamask using the 12 word mnenomic from the Ganache blockchain, this will give you access to the Ganache accounts that contain test Eth to perform transactions. To do this click forgot password, enter the 12 word phrase from ganache and set a password (which will allow you to log in without the phrase later). Finally, to add the Ganache blockchain to your Metamask network navigate to networks page and select add new network. Enter the RPC URL which can be found in the Ganache application (typically localhost:7545) and the chainID which is 1337. Make sure you have the selected the Ganache Network in the top right corner. To run the webpage, run the following commands from the project directory:

```console
> npm install
> truffle migrate --network ganache
> ng serve
```
This installs dependencies, deploys the NFT contracts to the Ganache Blockchain and starts the webpage. Open your browser at `http://localhost:4200`. Once on the webpage, you can now upload images and/or metadata for the NFTs, select a contract (transferrable or not) and mint an NFT to the connected Metamask account. Upon clicking the mint button Metamask will prompt you to confirm the transaction. After confirming the transaction, a receipt will be shown to you and instructions on how to make the NFTs appear inside your wallet.


