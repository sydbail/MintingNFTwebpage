// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

//basic nft contract with all required functions from erc721, includes metadata which
//enables the contract to have a name and symbol, tokenURI is an included function but since
//we specifiy no baseURI in this contract, tokenURI will be a blank ""
//Transfers: disabled, Metadata: None

contract noTransferbasicNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    bool private _noTransfer = true;

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

    function transferFrom(
      address from,
      address to,
      uint256 tokenId
  ) public virtual override {
      //solhint-disable-next-line max-line-length

      //ensure transferring is allowed
      require(_noTransfer != true, "This token is NOT transferrable");
      require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

      _transfer(from, to, tokenId);
  }

  function safeTransferFrom(
      address from,
      address to,
      uint256 tokenId,
      bytes memory _data
  ) public virtual override {
      //check if tranferring is enabled
      require(_noTransfer != true, "This token is NOT transferrable");
      require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
      _safeTransfer(from, to, tokenId, _data);
  }
}
