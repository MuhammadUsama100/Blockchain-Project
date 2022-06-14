// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WalmartFT is ERC20 {
    uint256 public INITIAL_SUPPLY = 100000000000; // 5 ether == 1 WC

    constructor() ERC20("WalmartCoin", "WC") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
