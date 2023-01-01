import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";
import { useEffect, useState } from "react";
function App() {
  const a = [];
  useEffect(() => {
    async function run() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers.call();
      const prize = await web3.eth.getBalance(lottery.options.address);
      const accounts = await web3.eth.getAccounts();

      setValues({ manager, prize, account: accounts[0] });
      console.log(players);
    }
    run();
  }, []);
  const [values, setValues] = useState({
    manager: "",
    players: [],
    prize: "",
    value: "",
    account: "",
    message: ""
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setValues({ ...values, message: "Waiting for transation to complete" });
      await lottery.methods.enter().send({
        from: values.account,
        value: web3.utils.toWei(values.value, "ether")
      });
      setValues({ ...values, message: "You have registered for the lottery" });
    } catch (error) {
      setValues({ ...values, message: "You denied transaction" });
    }
    a.push(9);
  };
  return (
    <div className="App">
      <h1>Lottery on Blockchain</h1>
      <p>
        This lottery in managed by{" "}
        {values.manager ? values.manager : "Loading..."}
      </p>
      <p>
        There are currently {values.players ? values.players : "Loading..."}{" "}
        players
      </p>
      <p>
        Competing for{" "}
        {values.prize
          ? web3.utils.fromWei(values.prize, "ether")
          : "Loading..."}{" "}
        eth
      </p>
      <hr />
      <form action="submit" onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <label htmlFor="value">Amount of ether to enter </label>
        <input
          type="text"
          name="value"
          id="value"
          value={values.value}
          onChange={(event) => {
            setValues({ ...values, value: event.target.value });
          }}
        />
        <button type="submit">Enter</button>
      </form>
      <hr />
      {values.account == values.manager ? (
        <>
          <h2>Pick a winner</h2>
          <button
            onClick={async () => {
              setValues({ ...values, message: "Sending prize to winner" });
              await lottery.methods.pickWinner().send({
                from: values.account
              });
              setValues({ ...values, message: "Prize sent" });
              a.push(9);
            }}
          >
            Pick a winner
          </button>
          <hr />
        </>
      ) : (
        ""
      )}
      <h3>{values.message}</h3>
    </div>
  );
}

export default App;
