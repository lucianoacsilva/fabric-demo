var express = require('express');
var bodyParser = require('body-parser');

// Controllers for the API
const { 
    getAllAssets, 
    readAsset, 
    createAsset, 
    updateAsset,
    deleteAsset, 
    getHistoryOfAsset
 } = require('./controllers/backendApi');

var app = express();
app.use(bodyParser.json());

// Routes of the API
app.get('/api/getAllAssets', getAllAssets);
app.get('/api/readAsset/:index', readAsset);
app.post('/api/createAsset/', createAsset);
app.put('/api/updateAsset/:index', updateAsset);
app.delete('/api/deleteAsset/:index', deleteAsset);
app.get('/api/getHistoryOfAsset/:key', getHistoryOfAsset);

console.log("Server is up and running on port 8000!!!");
app.listen(8000);