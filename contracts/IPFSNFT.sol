// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

//basic NFT contract
//contains all ERC721 compliant functions
//uses IPFS with metadata extension
//Transfers: Allowed, Metadata: IPFS hashes

contract IPFSNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => uint8) hashes;
    string private baseURI_;

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
      require(hashes[imagehash] != 1, "Error: an NFT has already been minted for this image.");

      hashes[imagehash] = 1;

      _tokenIds.increment();

      uint256 newItemId = _tokenIds.current();
      _mint(to, newItemId);
      _setTokenURI(newItemId, metadatahash);

      return newItemId;
    }
}
