// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

//basic NFT contract
//contains all ERC721 compliant functions (transfer functionality modified)
//uses IPFS with metadata extension
//Transfers: NOT allowed Metadata: IPFS hashes

//maybe this could be deployed twice, using var to enable transfers to lower costs

contract noTransferIPFSNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => uint8) hashes;
    string private baseURI_;
    bool _noTransfer = true;

    constructor(string memory name, string memory symbol, string memory baseURI) ERC721(name, symbol) {
        baseURI_ = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI_;
    }

    function mint(address to, string memory imagehash, string memory metadatahash)
      public
      returns (uint256)
    {
      //check if image hash already exists (image already minted)
      //throw an error here if true
      require(hashes[imagehash] != 1);

      hashes[imagehash] = 1;

      _tokenIds.increment();

      uint256 newItemId = _tokenIds.current();
      _mint(to, newItemId);
      _setTokenURI(newItemId, metadatahash);

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
