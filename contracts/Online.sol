pragma solidity 0.8.1;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
contract Online is ERC721, Ownable, ERC721Burnable {
    struct Item {
        string name;
        uint8 grade;
        uint8 attack;
        string speed;
        uint8 range;
        uint8 magicDamage;
        bool collectible;
    }
    uint256  nextId = 0;
    mapping(uint256=> Item) private _tokenDetails;

    constructor(string memory name, string memory symbol) ERC721(name, symbol){

    }
    function getTokenDetails(uint256 tokenId) public view returns (Item memory){
        return _tokenDetails[tokenId];
    }
    function totalNFT() public view returns (uint256){
        return nextId;
    }
    function mint(string memory name, uint8 grade, uint8 attack, string memory speed, 
        uint8 range, uint8 magicDamage, bool collectible) public onlyOwner{
        _tokenDetails[nextId] = Item(name, grade, attack, speed, range, magicDamage, collectible); 
        _safeMint(msg.sender, nextId );
        nextId++;
    }
    function upgradeItem(uint256 tokenId, uint256 busId) public{ 
        Item memory item = getTokenDetails(tokenId);
        bool upgradeSuccess = false;
        bool upgradable = true;
        burn(busId);
        if(item.grade <= 3 && (rand() < 1000)){
            upgradable = true;
            upgradeSuccess = true;
        }else if(item.grade <= 4 && rand() < 700){
            upgradable = true;
            upgradeSuccess = true;
        }else if(item.grade <= 5 && rand() < 500){
            upgradable = true;
            upgradeSuccess = true;
        }else if(item.grade <= 6 && rand() < 400){
            upgradable = true;
            upgradeSuccess = true;
        }else if(item.grade <= 7 && rand() < 150){
            upgradable = true;
            upgradeSuccess = true;
        }else if(item.grade <= 8 && rand() < 10){
            upgradable = true;
            upgradeSuccess = true;
        }else if(item.grade <= 9 && rand() <= 1){
            upgradable = true;
            upgradeSuccess = true;
        }else if(item.grade == 10){
            upgradable = false;
        }
        if(upgradable){
            if(upgradeSuccess){
                item.grade++;
                item.attack = item.attack + 10;
                item.magicDamage = item.magicDamage + 10;
                _tokenDetails[tokenId] = item;
            }else{
                burn(tokenId);
            }
        }
    }
    function rand() public view returns(uint256)
    {
        uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp + block.difficulty + ((uint256(keccak256(abi.encodePacked(block.coinbase)))) / (block.timestamp)) + block.gaslimit + ((uint256(keccak256(abi.encodePacked(msg.sender)))) / (block.timestamp)) +
            block.number
        )));

        return (seed - ((seed / 1000) * 1000));
    }

    function getAllTokensForUser(address user) public view returns (uint256[] memory){
        uint256 tokenCount = balanceOf(user);
        if(tokenCount == 0){
            return new uint256[](0);
        }else{
            uint[] memory result = new uint256[](tokenCount);
            uint256 totalItems = nextId;
            uint256 resultIndex = 0;
            for(uint256 i = 0; i < totalItems; i++){
                if(ownerOf(i) == user){
                    result[resultIndex] = i;
                    resultIndex++;
                }
            }
            return result;
        }
    }
    // function checkIfTokenExist(uint256 tokenId) public view returns (address) {
    //     require (_exists(tokenId), 'Token does not exist');
    //     return ownerOf(tokenId);
    // }
    // function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override{
    //     Item storage pet = _tokenDetails[nextId];
    //     require(pet.lastMeal + pet.endurance > block.timestamp);
    // }
}