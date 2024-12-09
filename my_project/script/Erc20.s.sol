// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {Erc20} from "../src/Erc20.sol";

contract DeployErc20 is Script {
    
    function run() external {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address sender = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);
        new Erc20(1000);//這邊就是Erc20合約!!

        vm.stopBroadcast();
    }
}