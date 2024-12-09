// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Erc20} from "../src/Erc20.sol";

contract CounterTest is Test {
    Erc20 public erc20;

    address alice = address(0*1);
    address bob = address(0*2);

    function setUp() public {
        vm.prank(alice);
        erc20 = new Erc20(100);
    }

    function test_totalSupply() public {
        
        assertEq(erc20.totalSupply(), 100);
    }
}
