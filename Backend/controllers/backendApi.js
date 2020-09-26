

// Setting for Hyperledger Fabric
const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..',  'TwoOrgEnvExampleOrg1Connection.json');

const getAllAssets = async function (req, res) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd() , 'Org1');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin');
        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('Project');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('readAllAssets');
        console.log(`Transaction has been evaluated, result is: ${JSON.parse(result.toString())}`);

        const parsedResult = JSON.parse(result.toString());

        const formatedRecords = parsedResult.map((result) => {
            return {
                id: result.Key,
                value: result.Record.value
            }
        })
        
        res.status(200).json({
            response: formatedRecords
        });

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
    }
}

const readAsset = async function (req, res) {
    try {
        const {
            index
        } = req.params;
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd() , 'Org1');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin');
        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('Project');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('readSomeAsset', index);
        console.log(`Transaction has been evaluated, result is: ${JSON.parse(result.toString())}`);

        const parsedResult = JSON.parse(result.toString());
        console.log(parsedResult);
        
        res.status(200).json({
            response: JSON.parse(result.toString())
        });

    } 
    
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
    }
}


const createAsset = async function (req, res) {
    try {
        const {
            value
        } = req.body;

        // Generate random index
        const index = Math.floor(Math.random() * 100000).toString();
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd() , 'Org1');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin');
        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('Project');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.submitTransaction('createSomeAsset', index, value);
        console.log(result);
        //console.log(`Transaction has been evaluated, result is: ${JSON.parse(result.toString())}`);

        //const parsedResult = JSON.parse(result.toString());
        //console.log(parsedResult);
        
        res.status(200).json({
            message: "Asset created successfully",
        });

    } 
    
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });

    }
}

const updateAsset = async function (req, res) {
    try {

        const {
            index
        } = req.params;

        const {
            value
        } = req.body;
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd() , 'Org1');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin');
        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('Project');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.submitTransaction('updateSomeAsset', index, value);
        console.log(result);
        //console.log(`Transaction has been evaluated, result is: ${JSON.parse(result.toString())}`);

        //const parsedResult = JSON.parse(result.toString());
        //console.log(parsedResult);
        
        res.status(200).json({
            message: "Asset updated successfully",
        });

    } 
    
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });

    }
}

const deleteAsset = async function (req, res) {
    try {
        const {
            index
        } = req.params;
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd() , 'Org1');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin');
        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('Project');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.submitTransaction('deleteSomeAsset', index);
        //console.log(`Transaction has been evaluated, result is: ${JSON.parse(result.toString())}`);

        res.status(200).json({
            message: "Asset deleted successfully",
        });

    } 
    
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });

    }
}

module.exports = {
    getAllAssets,
    readAsset,
    createAsset,
    updateAsset,
    deleteAsset
}