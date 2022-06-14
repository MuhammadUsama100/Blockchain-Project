// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WalmartFT is ERC20 {
    uint256 public INITIAL_SUPPLY = 100000000000; // 5 ether == 1 WC

    constructor() ERC20("WalmartCoin", "WC") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    uint256 totalWalmartEarning = 0;
    struct Store {
        string storeType;
        string storeName;
        string storeId;
    }
    struct StoreProduct {
        string productName;
        string productID;
        string uri;
        Store store;
    }
    struct Transection {
        string dateOfTransection;
        string transectionPerformedBy;
        uint256 totalAmountPayed;
        StoreProduct storeProduct;
    }
    mapping(address => Transection) public walmartTransections;

    function WalmartPaymentInFT(
        string memory dateOfTransection,
        string memory transectionPerformedBy,
        uint256 totalAmountPayed,
        uint256 productAmount,
        string memory productName,
        string memory productID,
        string memory productURI,
        string memory storeType,
        string memory storeName,
        string memory storeId
    ) public {
        // Validate Transection :: =>
        //    1) validate Amount payed
        //    2) productName should not be empty
        //    3) productID should not be empty
        //    4) storeName should not be empty
        //    5) storeId should not be empty
        //    6) dateOfTransection should not be empty
        //    7) transectionPerformedBy should not be empty

        require(productAmount == totalAmountPayed);
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
            productURI,
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
    }
}
