import { ethers } from 'hardhat';
import { expect, assert } from 'chai';
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types';

describe('SimpleStorage', () => {
  let SimpleStorage: SimpleStorage;
  let SimpleStorageFactory: SimpleStorage__factory;
  beforeEach(async () => {
    SimpleStorageFactory = (await ethers.getContractFactory(
      'SimpleStorage'
    )) as SimpleStorage__factory;
    SimpleStorage = await SimpleStorageFactory.deploy();
  });
  it('Should start with a favorite number of 0', async function () {
    const currentValue = await SimpleStorage.retrieve();
    const expectedValue = '0';
    // assert
    // expect
    // assert.equal(currentValue.toString(), expectedValue);
    expect(currentValue.toString()).to.equal(expectedValue);
  });
  // npx hardhat test --grep store //will run this //not run up because of 'store' keyword
  it('Should update when we call store', async function () {
    const expectedValue = '7';
    const transactionResponse = await SimpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await SimpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
});
