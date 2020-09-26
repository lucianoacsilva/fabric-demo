/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { SomeAssetContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('SomeAssetContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new SomeAssetContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"some asset 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"some asset 1002 value"}'));
    });

    describe('#someAssetExists', () => {

        it('should return true for a some asset', async () => {
            await contract.someAssetExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a some asset that does not exist', async () => {
            await contract.someAssetExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createSomeAsset', () => {

        it('should create a some asset', async () => {
            await contract.createSomeAsset(ctx, '1003', 'some asset 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"some asset 1003 value"}'));
        });

        it('should throw an error for a some asset that already exists', async () => {
            await contract.createSomeAsset(ctx, '1001', 'myvalue').should.be.rejectedWith(/The some asset 1001 already exists/);
        });

    });

    describe('#readSomeAsset', () => {

        it('should return a some asset', async () => {
            await contract.readSomeAsset(ctx, '1001').should.eventually.deep.equal({ value: 'some asset 1001 value' });
        });

        it('should throw an error for a some asset that does not exist', async () => {
            await contract.readSomeAsset(ctx, '1003').should.be.rejectedWith(/The some asset 1003 does not exist/);
        });

    });

    describe('#updateSomeAsset', () => {

        it('should update a some asset', async () => {
            await contract.updateSomeAsset(ctx, '1001', 'some asset 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"some asset 1001 new value"}'));
        });

        it('should throw an error for a some asset that does not exist', async () => {
            await contract.updateSomeAsset(ctx, '1003', 'some asset 1003 new value').should.be.rejectedWith(/The some asset 1003 does not exist/);
        });

    });

    describe('#deleteSomeAsset', () => {

        it('should delete a some asset', async () => {
            await contract.deleteSomeAsset(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a some asset that does not exist', async () => {
            await contract.deleteSomeAsset(ctx, '1003').should.be.rejectedWith(/The some asset 1003 does not exist/);
        });

    });

});