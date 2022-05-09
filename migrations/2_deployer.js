const basicNFT = artifacts.require("basicNFT");
const ipfsNFT = artifacts.require("IPFSNFT");
const noTbasic = artifacts.require("noTransferbasicNFT");
const noTipfs = artifacts.require("noTransferIPFSNFT");

module.exports = function (deployer) {
  deployer.deploy(basicNFT, "NFT token with no Metadata", "BasicNFT");
  deployer.deploy(ipfsNFT, "NFT token with IPFS metadata", "ipfsNFT", "ipfs://");
  deployer.deploy(noTbasic, "Non-Transferrable NFT token with no Metadata", "NoTransferNFT");
  deployer.deploy(noTipfs, "Non-Transferrable NFT token with IPFS metadata", "NoTransferipfsNFT", "ipfs://");
};
