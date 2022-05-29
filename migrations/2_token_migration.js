const Token = artifacts.require("Token");

module.exports = async function (deployer) {
  await deployer.deploy(Token, "NFT Game", "NFTG");
  let tokenInstance = await Token.deployed();
  await tokenInstance.mint(100, 200, 100000); // token id 0
  await tokenInstance.mint(200, 300, 104000); // token id 1
  let pet = await tokenInstance.getTokenDetails(0);
  console.log(pet);
};;
