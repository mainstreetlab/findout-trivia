// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Quiz} from "../src/Quiz.sol";
//import {SimpleHelper} from './SimpleHelper.sol';
//import {WETH} from "@solmate/tokens/WETH.sol";
//import {SafeTransferLib} from "@solmate/utils/SafeTransferLib.sol";
//import "./utils/Cheats.sol";
import {HelperEvents} from "./HelperEvents.sol";
import "lib/forge-std/Test.sol";

contract QuizTest is Test, HelperEvents {
    //using SafeTransferLib for WETH;
    using SafeTransferLib for address;

    Quiz public quiz;
    //Cheats internal constant cheats = Cheats(HEVM_ADDRESS);

    ERC20 immutable usdc = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;

    uint256 constant IS_ACTIVE = 1;
    uint256 constant DECIMAL = 1e6;
    uint256 constant FEE_RATE = 1e5;
    uint256 constant PRIZE_LIMIT = 2e6;
    address public maker;
    uint256  feeBalance;
    uint256 i;

    address Bob = address(0x73A1);
    address Alice = address(0x14);
    address Tess = address(0x192);

    function setUp() public {
        quiz = new Quiz;
        maker = msg.sender;
    }

    function testCanCreate() public {
        uint256 amount = 5e6;
        assertGt(amount, PRIZE_LIMIT);

        uint256[5] answers = [4,2,1,3,0];

        vm.prank(Bob);
        quiz.create(answers, amount);

       // bool success = usdc.transferFrom(msg.sender, address(this), amount);
       // assertTrue(success);

        vm.expectEmit(true, true, false, true, address(msg.sender));
        emit Open (msg.sender, amount);
  }

  function fuzztestCanCreate(uint256[5] calldata answers, uint256 amount) public {
        uint256 amount = 5e6;
        assertGt(amount, PRIZE_LIMIT);

        uint256[5] answers = [4,2,1,3,0];

        vm.prank(Bob);
        quiz.create(answers, amount);

        bool success = usdc.transferFrom(msg.sender, address(this), amount);
        assertTrue(success);

        vm.expectEmit(true, true, false, true, address(msg.sender));
        emit Open (msg.sender, amount);
  }

  /*
  function initiateWithSpray(uint256 a, uint256 b, uint256 c, uint256 d, uint256 e, uint256 amount, uint256 ben) external {
    require(ben > 1 && amount >= limit);
    uint256 a = amount / fee;
    uint256 bounty = amount - a;
    usdc.transferFrom(msg.sender, address(this), amount);
    feeBalance += a;
    record [i] = struct answer(uint256 a, uint256 b, uint256 c, uint256 d, uint256 e, msg.sender, bounty);

    //abi.encode(uint256 a, uint256 b, uint256 c, uint256 d, uint256 e, msg.sender, bounty, ben);
    ++i;
    event Open(msg.sender, amount);
  }
  */

  function play(uint256 a, uint256 b, uint256 c, uint256 d, uint256 id) external{
    //require(record[id] != msg.sender, "can't play");
    //require(record[id].initiator != msg.sender, "can't play");

    (uint256 dea, uint256 deb, uint256 dec, uint256 ded, uint256 dee, address creator, uint256 bounty, uint256 ben) = abi.decode(record[id]);

    require(creator != msg.sender, "can't play");

    if(dea == a && deb == b && dec == c && ded == d && dee == e && ben != 0) { 
      uint256 amount = bounty/ben; 
      ben -= 1;
      record[id] = abi.encode(uint256 a, uint256 b, uint256 c, uint256 d, uint256 e, msg.sender, bounty, ben);
      bool sent = usdc.transfer(msg.sender, amount);
      require(sent);
      event W(msg.sender, amount);
      delete record[id];
    }

    /*
    answer memory a = record [id];

    if(a.a == a && a.b == b && a.c == c && a.d == d) {
      usdc.transferFrom(a.initiator, msg.sender, a.amount);
      event W(msg.sender, a.jamount);
      delete record[id];
    }
    */
  }

  function deprecate() {
    require(msg.sender == maker);
    isActive = 0;
  }

  function pullFunds(address to, uint256 amount) external {
    require(msg.sender == maker);
    feeBalance -= amount;
    bool pulled = usdc.transfer(to, amount);
    require(pulled);
    emit Withdrawn(msg.sender, amount);
  }
}

}