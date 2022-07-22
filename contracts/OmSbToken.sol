// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OmSbToken is ERC721, Ownable, EIP712, ERC721Votes {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;

  // mapping(uint256 => string) public identityData;
  mapping(address => string) public identityData;
  mapping(address => bool) public haveId;

  constructor() ERC721("OmSbIdentity", "OSI") EIP712("OmSbIdentity", "1") {}

  function safeMint(address to, string memory _identityData) public onlyOwner {
    require(haveId[to] == false);
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    identityData[to] = _identityData;
    haveId[to] = true;
    _safeMint(to, tokenId);
    
  }

  // The following functions are overrides required by Solidity.

  function _afterTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721, ERC721Votes) {
    super._afterTokenTransfer(from, to, tokenId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721) {
    require(from == address(0), "Err: token is SOUL BOUND");
    super._beforeTokenTransfer(from, to, tokenId);
  }
}
