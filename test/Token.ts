import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token contract", () => {
    it("Deployment should assign the total supply of tokens to the owner", async () => {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const jonathanmvToken = await Token.deploy();

        const ownerBalance = await jonathanmvToken.balanceOf(owner.address);
        expect(await jonathanmvToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should transfer tokens between accounts", async () => {
        const [owner, accountOne, accountTwo] = await ethers.getSigners();
        
        const Token = await ethers.getContractFactory("Token");
        const jonathanmvToken = await Token.deploy();

        // from owner to accountOne
        await jonathanmvToken.transfer(accountOne.address, 50);
        expect(await jonathanmvToken.balanceOf(owner.address)).to.equal((await jonathanmvToken.totalSupply()).toNumber() - 50);
        expect(await jonathanmvToken.balanceOf(accountOne.address)).to.equal(50);

        // switch accounts
        jonathanmvToken.connect(accountOne);
        await jonathanmvToken.transfer(accountTwo.address, 25);
        expect(await jonathanmvToken.balanceOf(accountTwo.address)).to.equal(25);

    });
});
