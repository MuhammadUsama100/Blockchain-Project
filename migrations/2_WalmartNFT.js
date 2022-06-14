const WalmartNFT = artifacts.require("WalmartNFT");

module.exports = function (deployer) {
  deployer.deploy(WalmartNFT);
};
