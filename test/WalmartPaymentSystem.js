const WalmartPaymentSystem = artifacts.require("WalmartPaymentSystem");
const WalmartFT = artifacts.require("WalmartFT");
const WalmartNFT = artifacts.require("WalmartNFT");

const asserts = require("assert");

contract("WalmartFT", (accounts) => {
  const Name = "usama";
  const dateOfTransection = "5/15/2022";
  const transectionPerformedBy = "Usama";
  const productName = "Dress Shirt";
  const productID = "001";
  const totalAmountPayed = 1; // 1 WC
  const productCost = 1; // 1 WC
  const productURI =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJRyknZcmYk949gRH1CkcdlliJOqTrFTct0Q&usqp=CAU";
  const storeType = "Mens Clothing";
  const storeName = "Outfitter";
  const storeId = "01";
  const Email = "k180154@nu.edu.pk";

  var [FTOwner, BUYER, OwnerAccount] = accounts;

  it("Payment by NF ::=>", async () => {
    const instance = await WalmartFT.deployed();
    const initial = await instance.INITIAL_SUPPLY();
    var FTOwnerBalance = await instance.balanceOf(FTOwner);

    asserts.equal(
      FTOwnerBalance.toString(),
      initial.toString(),
      "FTOwner Account Balance Matched"
    );
    // 1 WC === 5 ether
    await instance.transfer(BUYER, 100);

    var buyersBalance = await instance.balanceOf(BUYER);

    asserts.equal(
      buyersBalance.toString(),
      "100",
      "BUYER Account Balance Matched"
    );

    // payment using WC instead of ether
    await instance.WalmartPaymentInFT(
      dateOfTransection,
      transectionPerformedBy,
      totalAmountPayed,
      productCost,
      productName,
      productID,
      productURI,
      storeType,
      storeName,
      storeId,
      {
        from: BUYER,
      }
    );
    // await instance.approve(BUYER, 10);
    var x = await instance.allowance(FTOwner, BUYER);
    var x = await instance.increaseAllowance(BUYER, 1000000);
    await instance.transferFrom(BUYER, FTOwner, 1);

    buyersBalance = await instance.balanceOf(BUYER);
    asserts.equal(
      buyersBalance.toString(),
      "99",
      "BUYER Account Balance Matched"
    );

    FTOwnerBalance = await instance.balanceOf(FTOwner);

    asserts.equal(
      FTOwnerBalance.toString(),
      (initial - 99).toString(),
      "Account Owner Account Balance Matched"
    );

    var transection = await instance.walmartTransections(BUYER);
    asserts.equal(
      transection.transectionPerformedBy,
      "Usama",
      "You should be able to subscribe"
    );
  });
});

contract("WalmartPaymentSystem", (accounts) => {
  var BUYER = accounts[1];
  const Name = "usama";
  const dateOfTransection = "5/15/2022";
  const transectionPerformedBy = "Usama";
  const totalAmountPayed = 5;
  const productName = "Dress Shirt";
  const productID = "001";
  const productURI =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJRyknZcmYk949gRH1CkcdlliJOqTrFTct0Q&usqp=CAU";
  const storeType = "Mens Clothing";
  const storeName = "Outfitter";
  const storeId = "01";
  const Email = "k180154@nu.edu.pk";
  const OwnerAccount = "0x56e1AACEA6C60F6D6b6DBe5dF3E6568a6C292dc4";

  it("Payment by ether ::=>", async () => {
    const instance = await WalmartPaymentSystem.deployed();

    await instance.WalmartPaymentInEther(
      dateOfTransection,
      transectionPerformedBy,
      totalAmountPayed,
      OwnerAccount,
      productName,
      productID,
      productURI,
      storeType,
      storeName,
      storeId,
      {
        from: BUYER,
        value: totalAmountPayed,
      }
    );

    var transection = await instance.walmartTransections(BUYER);
    asserts.equal(
      transection.transectionPerformedBy,
      "Usama",
      "You should be able to subscribe"
    );
  });
});
