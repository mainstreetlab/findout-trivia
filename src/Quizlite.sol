//SPDX-License-Identifier: MIT
pragma solidity^0.8.20;

contract Quizlite {
  
  address maker;

  //CONFIGS
  uint256 i;
  uint256 check;
  uint256 isActive = 1;
  
  //MAPPINGS
  mapping(uint256 => bytes) public record;
  mapping(address => mapping(uint256 => uint256)) played;

  //EVENTS
  event Open(address indexed creator);
  event W(address indexed player);
  event TryAnother(address indexed player);
    
  constructor () {
    maker = msg.sender;
  }

  //FUNCTIONS    
  function create(uint256[5] calldata answers) external {
    record [i] = abi.encode(
      answers[0],
      answers[1],
      answers[2],
      answers[3], 
      answers[4], 
      msg.sender, 
      address(0), 
      1
    );
    emit Open (msg.sender);
    ++i;
  }

  //@notice:   
  function play(uint256[5] calldata choices, uint256 id) external {
    require(played[msg.sender][id] == 0, "you have played");
    ( uint256 dea,
      uint256 deb, 
      uint256 dec, 
      uint256 ded, 
      uint256 dee, 
      address creator, 
      address winner, 
      uint256 ben
    ) = abi.decode(
      record[id], (uint256, uint256, uint256, uint256, uint256, address, address, uint256));
    require(creator != msg.sender, "can't play");

    if(dea == choices[0] && deb == choices[1] && dec == choices[2] && ded == choices[3] && dee == choices[4] && ben != 0 && winner == address(0)) { 
      ben -= 1;
      record[id] = abi.encode(choices[0], choices[1], choices[2], choices[3], choices[4], creator, msg.sender, ben);
      played[msg.sender][id] = 1;
      emit W(msg.sender);
    }
    else {
      played[msg.sender][id] = 1;
      emit TryAnother(msg.sender);
    }
  }
    
  function deprecate() public {
    require(msg.sender == maker);
    isActive = 0;
  }

  function reinit() public {
    require(msg.sender == maker);
    isActive = 1;
  }

}