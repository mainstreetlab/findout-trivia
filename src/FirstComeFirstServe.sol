//SPDX-License-Identifier: MIT
pragma solidity^0.8.20;

import "ERC20" from "https://github.com/transmissions11/solmate/src/tokens/ERC20.sol";

contract FirstComeFirstServe {

  //BASE MAINNET ADDRESS - 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
  //BASE SEPOLIA TESTNET 
  ERC20 immutable usdc = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;


  uint256 isActive = 1;
  uint256 decimal = 1e6;
  uint256 feeRate = 1e5;
  uint256 limit = 2*1e6;
  address creator;
  uint256 feeBalance;

  /*
  struct answer {
    uint256 a, 
    uint256 b, 
    uint256 c, 
    uint256 d,
    uint256 e,
    address initiator, 
    uint256 amount,
    uint256 ben
  };
  */

  uint256 i;
  //mapping (uint256 => answer) public record;
  mapping (uint256 => bytes) public record;
  //mapping (uint256 => address) public initiator;

  event Open(address indexed initiator, uint256 indexed amount);
  event W(address indexed player, uint256 indexed prize);
  event Withdrawn(address indexed creator, uint256 indexed fund);
  
  constructor () {
    creator = msg.sender;
  }

  function initiate (uint256 a, uint256 b, uint256 c, uint256 d, uint256 e, uint256 amount) external {
    require(amount >= limit);
    uint256 amountinSingleDecimal = amount / decimal;
    uint256 fee = amountinSingleDecimal * feeRate;
    uint256 bounty = amount - fee;
    usdc.transferFrom(msg.sender, address(this), amount);
    feeBalance += fee;
    record [i] = 
    
    //struct answer(uint2 a, uint256 b, uint256 c, uint256 d, uint256 e, msg.sender, bounty, 1);

    abi.encode(uint a, uint b, uint c, uint d, uint e, msg.sender, bounty, 1);
    emit Open (msg.sender, amount);
    ++i;
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

    (uint256 dea, uint256 deb, uint256 dec, uint256 ded, uint256 dee, address initiator, uint256 bounty, uint256 ben) = abi.decode(record[id]);

    require(initiator != msg.sender, "can't play");

    if(dea == a && deb == b && dec == c && ded == d && dee == e && ben != 0) { 
      uint256 amount = bounty/ben; 
      ben -= 1;
      record[id] = abi.encode(uint256 a, uint256 b, uint256 c, uint256 d, uint256 e, msg.sender, bounty, ben);
      usdc.transfer(msg.sender, amount);
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
    require(msg.sender == creator);
    isActive = 0;
  }

  function pullFunds(address to, uint256 amount) external {
    require(creator == msg.sender);
    feeBalance -= amount;
    usdc.transfer(to, amount);

    emit Withdrawn(msg.sender, amount);
}