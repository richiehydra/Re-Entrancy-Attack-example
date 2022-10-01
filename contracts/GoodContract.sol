// SPDX-License-Identifier: MIT

pragma solidity >= 0.5.0 < 0.9.0;

contract GoodContract 
{
    mapping(address=>uint)public balances;

    function addBalance()public payable
    {
        balances[msg.sender]=balances[msg.sender]+msg.value;
    }

    function withdraw()public 
    {
        require(balances[msg.sender]>0,"Not Enough Balance");
        (bool sent,)=msg.sender.call{value:balances[msg.sender]}("");
        require(sent,"Failed To Transact Ethers");
        balances[msg.sender]=0;
    }
}