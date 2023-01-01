const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const provider = new HDWalletProvider(
  "security spoil traffic coin tide saddle athlete amused exhaust tongue replace raw",
  "https://goerli.infura.io/v3/70ecbe24c51241818f9aa778b3851e47"
);
const web3 = new Web3(provider);

(async () => {
  const account = await web3.eth.getAccounts();
  console.log("Attempting to deploy from  ", account[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode
    })
    .send({ from: account[0], gas: "1000000" });
  console.log("Deployed to  ", result.options.address);
  console.log(interface);
  provider.engine.stop();
})();
