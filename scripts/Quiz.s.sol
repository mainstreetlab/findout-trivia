// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Quiz} from "./src/Quiz.sol";
import {Script} from "./lib/forge-std/src/Script.sol";
//import {console2} from "../lib/forge-std/src/console2.sol";
//import {stdJson} from "../lib/forge-std/src/StdJson.sol";

contract QuizDeployScript is Script{

    function run() external {
        uint256 deployerPrivateKey = vm.envUint(PRIVATE_KEY);

        vm.startBroadcast(deployerPrivateKey);

        Quiz quiz = new Quiz();

        vm.stopBroadcast();
    }

}