const WalmartPaymentSystem = artifacts.require("WalmartPaymentSystem");

module.exports = function (deployer) {
  deployer.deploy(WalmartPaymentSystem);
};
