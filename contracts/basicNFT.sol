// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

//basic nft contract with all required functions from erc721, includes metadata which
//enables the contract to have a name and symbol, tokenURI is an included function but since
//we specifiy no baseURI in this contract, tokenURI will be a blank ""
//Transfers: allowed, Metadata: None

contract basicNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(address to)
      public
      returns (uint256)
    {
      _tokenIds.increment();

      uint256 newItemId = _tokenIds.current();
      _mint(to, newItemId);

      return newItemId;
    }
}
