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
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
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

    async getAllResults(iterator) {
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value) {
                // if not a getHistoryForKey iterator then key is contained in res.value.key
                allResults.push(res.value.value.toString('utf8'));
            }
    
            // check to see if we have reached then end
            if (res.done) {
                // explicitly close the iterator
                await iterator.close();
                return allResults;
            }
        }
    }

    async readAllAssets(ctx) {
        // Query to get all assets
        const getAllQuery = {
            selector: {}
        };

        console.log("Aaaa");
        
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(getAllQuery));

        console.log("Bbbbbb");

        const allResults = [];

        // Return all assets

        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

}

module.exports = SomeAssetContract;
