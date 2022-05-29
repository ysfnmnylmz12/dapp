const Online = artifacts.require("Online");

module.exports = async function (deployer) {
  await deployer.deploy(Online, "NFT Online", "NFTO");
  let onlineInstance = await Online.deployed();
  await onlineInstance.mint("Raptor", 1, 97, "Very Slow", 100, 10, false);
  await onlineInstance.mint("Raptor", 1, 97, "Very Slow", 100, 10, false);
  await onlineInstance.mint("Bus", 0, 0, "", 0, 0, true);
  await onlineInstance.mint("Bus", 0, 0, "", 0, 0, true);
  await onlineInstance.mint("Bus", 0, 0, "", 0, 0, true);
  await onlineInstance.mint("Bus", 0, 0, "", 0, 0, true);
  await onlineInstance.mint("Bus", 0, 0, "", 0, 0, true);
  await onlineInstance.mint("Bus", 0, 0, "", 0, 0, true);
  // await onlineInstance.burn(0);
};
