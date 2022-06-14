// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract WalmartPaymentSystem {
    uint256 totalWalmartEarning = 0;
    struct Store {
        string storeType;
        string storeName;
        string storeId;
    }
    struct StoreProduct {
        string productName;
        string productID;
        Store store;
    }
    struct Transection {
        string dateOfTransection;
        string transectionPerformedBy;
        uint256 totalAmountPayed;
        StoreProduct storeProduct;
    }

    constructor() {}

    mapping(address => Transection) public walmartTransections;

    function WalmartPaymentInEther(
        string memory dateOfTransection,
        string memory transectionPerformedBy,
        uint256 totalAmountPayed,
        address payable OwnerAccount,
        string memory productName,
        string memory productID,
        string memory storeType,
        string memory storeName,
        string memory storeId
    ) external payable {
        // Validate Transection :: =>
        //    1) validate Amount payed
        //    2) productName should not be empty
        //    3) productID should not be empty
        //    4) storeName should not be empty
        //    5) storeId should not be empty
        //    6) dateOfTransection should not be empty
        //    7) transectionPerformedBy should not be empty

        require(msg.value == totalAmountPayed);
        require(bytes(productName).length > 0);
        require(bytes(productID).length > 0);
        require(bytes(storeName).length > 0);
        require(bytes(storeId).length > 0);
        require(bytes(dateOfTransection).length > 0);
        require(bytes(transectionPerformedBy).length > 0);

        // Store , Store Product , Transection objects ::=>
        Store memory store = Store(storeType, storeName, storeId);
        StoreProduct memory storeProduct = StoreProduct(
            productName,
            productID,
            store
        );
        Transection memory transection = Transection(
            dateOfTransection,
            transectionPerformedBy,
            totalAmountPayed,
            storeProduct
        );
        // Object Of transection stored in  walmartTransection in smartcontract
        walmartTransections[msg.sender] = transection;

        totalWalmartEarning = totalWalmartEarning + totalAmountPayed;
        // Payment transfered to OwnerAccount
        OwnerAccount.transfer(totalAmountPayed);
    }
}
