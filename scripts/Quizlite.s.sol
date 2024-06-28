// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Quizlite} from "../src/Quizlite.sol";
import {Script} from "../lib/forge-std/src/Script.sol";
//import {console2} from "../lib/forge-std/src/console2.sol";
//import {stdJson} from "../lib/forge-std/src/StdJson.sol";

contract QuizliteDeployScript is Script{

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        Quizlite quizlite = new Quizlite();

        vm.stopBroadcast();
    }

}