var express = require('express');
var bodyParser = require('body-parser');
const { 
    getAllAssets, 
    readAsset, 
    createAsset, 
    updateAsset,
    deleteAsset
 } = require('./controllers/backendApi');

var app = express();
app.use(bodyParser.json());

// Controllers for the api


app.get('/api/getAllAssets', getAllAssets);
app.get('/api/readAsset/:index', readAsset);
app.post('/api/createAsset/', createAsset);
app.put('/api/updateAsset/:index', updateAsset);
app.delete('/api/deleteAsset/:index', deleteAsset);

console.log("Server is up and running on port 8000!!!");
app.listen(8000);