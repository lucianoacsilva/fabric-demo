/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class SomeAssetContract extends Contract {

    async someAssetExists(ctx, someAssetId) {
        const buffer = await ctx.stub.getState(someAssetId);
        return (!!buffer && buffer.length > 0);
    }

    async createSomeAsset(ctx, someAssetId, value) {
        const exists = await this.someAssetExists(ctx, someAssetId);

        if (exists) {
            throw new Error(`The some asset ${someAssetId} already exists`);
        }

        const asset = value;
        const buffer = Buffer.from(asset);
        await ctx.stub.putState(someAssetId, buffer);
    }

    async readSomeAsset(ctx, someAssetId) {
        const exists = await this.someAssetExists(ctx, someAssetId);
        if (!exists) {
            throw new Error(`The some asset ${someAssetId} does not exist`);
        }
        const buffer = await ctx.stub.getState(someAssetId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateSomeAsset(ctx, someAssetId, newValue) {
        const exists = await this.someAssetExists(ctx, someAssetId);
        if (!exists) {
            throw new Error(`The some asset ${someAssetId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(someAssetId, buffer);
    }

    async deleteSomeAsset(ctx, someAssetId) {
        const exists = await this.someAssetExists(ctx, someAssetId);
        if (!exists) {
            throw new Error(`The some asset ${someAssetId} does not exist`);
        }
        await ctx.stub.deleteState(someAssetId);
    }

    async getHistoryOfAsset(ctx, key) {
        const historyIterator = await ctx.stub.getHistoryForKey(key);
        const allResults = [];

        while (true) {
            const res = await historyIterator.next();

            if (res.value && res.value.value.toString()) {
                const Key = res.value.key;
                let Record;

                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } 
                
                catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }

                allResults.push(Record);
            }

            if (res.done) {
                await historyIterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
        
    }

    async readAllAssets(ctx) {
        // Query to get all assets
        const getAllQuery = {
            selector: {}
        };

        const iterator = await ctx.stub.getQueryResult(JSON.stringify(getAllQuery));  

        const allResults = [];

        // Return all assets

        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } 
                
                catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }

                Record.key = Key;
                allResults.push(Record);
            }

            if (res.done) {
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

}

module.exports = SomeAssetContract;
