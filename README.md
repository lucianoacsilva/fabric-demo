# fabric-demo
Little demo of smart contract with Hyperledger Fabric and regression model based on its data.

## Deploy a simple network

- Open the **IBM® Blockchain Platform** extension on VSCode;
- On **Fabric Environments** tab, click over the "+" button;
- A command bar will pop up. Select the option "Create new from template";
- Choose one of the options that appear (the chosen for the lecture was **2 Org Template (2 CAs, 2 peers, 1 channel)**;
- If you choose "Create aditional local networks", the extension will redirect to a tutorial of creating networks with **Ansible**, which you can follow.

## Deploying chaincode

### Packaging

- Open **VSCode** inside the **Project** folder;
- Click over the three dots button in "Smart Contracts" tab and choose "Package Open Project";

IMPORTANT: You cannot package a chaincode with a version if any of the listed in the "Smart Contracts" tab has the same version. If so, change it in the **package.json** file.

### Install chaincode

On the **IBM® Blockchain Platform** extension on VSCode;

- On the "Fabric Environments" tab, select one environment;
- Click over it to start the environment;
- Click again to connect to the environment;
- Right click over "Smart Contracts" -> "Installed"
- Select "Install Smart Contract";
- Select the peer to install the chaincode;
- Choose a chaincode to install (the listed ones are those which were not installed yet").


### Instantiate/upgrade chaincode

After installing a chaincode in one or more peers, it is time to instantiate it on the channel.

- Right click at "Smart Contracts" -> "Insantiated". 
- If you have not ever instantiated the chaincode once, choose "Instantiate Smart Contract". Otherwise, "Upgrade Smart Contract".
- If you choose "Instantiate Smart Contract", you can choose a smart contract of the list and insantitate it (extension will ask another optional questions, for purpose of demonstration, you can just skip them by pressing "Enter");
- If you choose "Upgrade Smart Contract", it will show a list of already instantiated chaincodes on the channel. You can select one of them and insantiate a new version of it (it will appear a list of the versions). After this, the process follows as the instantiation of a new one.
- You can also upgrade a chaincode on the channel by right click over it (if exists in the "Smart Contracts" -> "Insantiated" area) and choosing "Upgrade Smart Contract". The processs, then, follows as described above.

## Considerations
Some important files, such as the wallets and the connections profiles, are not present in the repo, since they are always different when you deploy the systems in other networks and (in case of the wallets, specifically) for security reasons. Hence, it is necessary to regenerate them when you are running the project in a new network.
To generate the connection profile:

- Inside the **IBM® Blockchain Platform** extension on VSCode, click over the three dots button on the **Fabric Gateways** tab and select "Export Connection Profile" (you can do for any organization inside your network);
- Save the connection profile file inside "Backend" folder and change the file name in the **ccpPath** inside **controllers/backendApi.js** file.

To export the wallets (also inside the **IBM® Blockchain Platform** extension on VSCode):

- Go to "Fabric Wallets" tab and right click over the identity you want to export;
- Select "Export Wallet";
- Save the wallet inside the **Backend** folder;
- Change the **walletPath** variable inside the API controllers according to where you have put the wallet (in this case, they were stored inside "Org*" folder, but you can change according to where you have stored your identities).

## More

There is an interessant videoclass which explain the deploying process of a chaincode (OBS.: it uses an old version of Hyperledger Fabric, but most of the commands are quite similar):


- Start developing with the IBM Blockchain Platform VSCode Extension (updated). Available in: <https://www.youtube.com/watch?v=0NkGGIUPhqk>.

You can also check the documentation of the **IBM® Blockchain Plataform** VSCode extension:

- IBM Blockchain Platform Extension for VS Code. Available in: <https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform>. 



