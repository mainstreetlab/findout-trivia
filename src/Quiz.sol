//SPDX-License-Identifier: MIT
pragma solidity^0.8.20;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";

contract Quiz {

  //PRIZE CONFIG
  //BASE MAINNET ADDRESS - 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
  //BASE SEPOLIA TESTNET 
  ERC20 immutable usdc = ERC20(0x036CbD53842c5426634e7929541eC2318f3dCF7e);
  uint256 constant DECIMAL = 1e6;
  uint256 constant PRIZE_LIMIT = 2e6;

  //FEE CONFIG
  uint256 feeRate = 1e5;
  uint256 feeBalance;

  address maker;

  //CONFIGS
  uint256 i;
  uint256 check;
  uint256 isActive = 1;
  
  //MAPPINGS
  mapping(uint256 => bytes) public record;
  mapping(address => mapping(uint256 => uint256)) played;

  //EVENTS
  event Open(address indexed creator, uint256 indexed prize);
  event W(address indexed winner);
  event TryAnother(address indexed player);
  event Withdrawn(address indexed maker, uint256 indexed amount);
  event RateUpdate(uint256 indexed rate);
  
  constructor () {
    maker = msg.sender;
  }

  function create(uint256[5] calldata answers, uint256 amount) external {
    require(amount >= PRIZE_LIMIT, "prize too low");
    uint256 amountinSingleDecimal = amount / DECIMAL;
    uint256 fee = amountinSingleDecimal * feeRate;
    uint256 bounty = amount - fee;

    bool success = usdc.transferFrom(msg.sender, address(this), amount);
    require(success);
    feeBalance += fee;
    record [i] = abi.encode(
      answers[0],
      answers[1],
      answers[2],
      answers[3], 
      answers[4], 
      msg.sender,
      address(0),
      bounty, 
      1
    );
    emit Open(msg.sender, amount);
    ++i;
  }

  function play(uint256[5] calldata choices, uint256 id) external{
    require(played[msg.sender][id] == 0, "you have played");
    ( uint256 dea,
      uint256 deb, 
      uint256 dec, 
      uint256 ded, 
      uint256 dee, 
      address creator, 
      address winner,
      uint256 bounty, 
      uint256 ben
    ) = abi.decode(
      record[id], (uint256, uint256, uint256, uint256, uint256, address, address, uint256, uint256));
    require(creator != msg.sender, "can't play");

    if(dea == choices[0] && deb == choices[1] && dec == choices[2] && ded == choices[3] && dee == choices[4] && ben != 0 && winner == address(0)) { 
      uint256 amount = bounty/ben;
      ben -= 1;
      record[id] = abi.encode(choices[0], choices[1], choices[2], choices[3], choices[4], creator, msg.sender, amount, ben);
      played[msg.sender][id] = 1;
      bool sent = usdc.transfer(msg.sender, amount);
      require(sent);
      emit W(msg.sender);
    }
    else {
      played[msg.sender][id] = 1;
      emit TryAnother(msg.sender);
    }
  }


  //ADMIN CONFIG FUNCTIONS
  function deprecate() public {
    require(msg.sender == maker);
    isActive = 0;
  }

  function reinit() public {
    require(msg.sender == maker);
    isActive = 1;
  }

  function pullFunds(address to, uint256 amount) public {
    require(msg.sender == maker, "not the maker");
    feeBalance -= amount;
    bool pulled = usdc.transfer(to, amount);
    require(pulled);
    emit Withdrawn(msg.sender, amount);
  }

  function configFee(uint256 oldAmount, uint256 newAmount) public {
    require(msg.sender == maker, "not the maker");
    require(oldAmount == feeRate && newAmount >= 2e4);
    feeRate = newAmount;
    emit RateUpdate(newAmount);
  }
}