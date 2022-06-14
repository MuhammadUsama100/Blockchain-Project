const NetflixPayment = artifacts.require("NetflixPayment");
const asserts = require("assert");

contract("NetflixPayment", (accounts) => {
  var BUYER = accounts[1];
  const Name = "usama";
  const Email = "u@gmail.com";
  const NETFLIXACCOUNT = "0x56e1AACEA6C60F6D6b6DBe5dF3E6568a6C292dc4";

  it("should allow user to subscribe to netflix by paying eth", async () => {
    const instance = await NetflixPayment.deployed();
    const package = await instance.Packages(1); // subscibe package 1

    await instance.subscribeNetFlix(Name, Email, 1, NETFLIXACCOUNT, {
      from: BUYER,
      value: package.price,
    });

    var subName = await instance.netflixSubscribers(BUYER);
    asserts.equal(subName.email, Email, "You should be able to subscribe");
  });
});
