pragma solidity ^0.8.0;

//OpenZeppelin Contract Imports
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract toppicks is ERC721URIStorage {
    // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct TopPick {
        uint256 tokenID;
        bool forSale;
        uint256 price;
    }

    mapping(uint256 => TopPick) public toppick;

    constructor() ERC721("NbaTopPick", "NBA") {}

    function getTopPickInfo(uint256 tokenID)
        public
        view
        returns (TopPick memory)
    {
        return toppick[tokenID];
    }

    function getForSale(uint256 tokenID) public view returns (bool) {
        return toppick[tokenID].forSale;
    }

    function buyTopPick(uint256 tokenID) public payable returns (bool) {
        require(toppick[tokenID].forSale == true, "Top Pick not for sale");
        require(
            msg.sender.balance >= toppick[tokenID].price,
            "Not enough ETH to buy this Top Pick"
        );
        require(
            msg.sender != this.ownerOf(tokenID),
            "You already own this Top Pick"
        );

        address owner = this.ownerOf(tokenID);

        _safeTransfer(owner, msg.sender, tokenID, "Purchasing Top Pick");

        toppick[tokenID].forSale = false;

        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Failed to Transfer Top Pick");

        return success;
    }

    function listTopPick(uint256 tokenID, uint256 price) public returns (bool) {
        require(msg.sender == this.ownerOf(tokenID));

        toppick[tokenID].forSale = true;
        toppick[tokenID].price = price;

        return true;
    }

    function mintTopPickAndList(string memory tokenURI, uint256 price)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newTopPickId = _tokenIds.current();
        _safeMint(msg.sender, newTopPickId);
        _setTokenURI(newTopPickId, tokenURI);

        toppick[newTopPickId].tokenID = newTopPickId;
        toppick[newTopPickId].forSale = true;
        toppick[newTopPickId].price = price;

        return newTopPickId;
    }

    function mintTopPickDontList(string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newTopPickId = _tokenIds.current();
        _safeMint(msg.sender, newTopPickId);
        _setTokenURI(newTopPickId, tokenURI);

        toppick[newTopPickId].tokenID = newTopPickId;
        toppick[newTopPickId].forSale = false;
        toppick[newTopPickId].price = 0;

        return newTopPickId;
    }
}
