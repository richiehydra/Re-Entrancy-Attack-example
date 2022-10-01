const {expect}=require("chai");
const {ethers}=require("hardhat");
describe("Re-Entrancy Attack",()=>
{
  it("Should clear the balance of contract",async()=>
  {
    const GoodContract=await ethers.getContractFactory("GoodContract")
    const goodcontract=await GoodContract.deploy();
    await goodcontract.deployed();
    console.log(`The Contract Addess of the Good Contract is ${goodcontract.address}`);

    const BadContract=await ethers.getContractFactory("BadContract");
    const badcontract=await BadContract.deploy(goodcontract.address);
    await badcontract.deployed();
    console.log(`The Contract Addess of the Bad Contract is ${badcontract.address}`);

    const [innocentaddress,attackeraddress]=await ethers.getSigners();

    const tx=await goodcontract.connect(innocentaddress).addBalance({value:ethers.utils.parseEther("10")});

    await tx.wait();
    const balanceofgoodone=await ethers.provider.getBalance(goodcontract.address);
    expect(balanceofgoodone).to.equal(ethers.utils.parseEther("10"));
   
    const txn=await badcontract.connect(attackeraddress).attack({value:ethers.utils.parseEther("1")});

    await txn.wait();
    const balanceofbadone=await ethers.provider.getBalance(badcontract.address);
    expect(balanceofbadone).to.equal(ethers.utils.parseEther("11"));

  })
})
