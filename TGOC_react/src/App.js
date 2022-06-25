import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "You have been entered!" });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: "A winner has been picked!" });
  };

  render() {
    return (
      <div style={{color: "Black",textAlign:"center",backgroundColor:"orange"}}>
        <br></br>
        <h1>The Game Of chance!!</h1>
        <br></br>
        <p >
          This contract is managed by {this.state.manager}. There are currently{" "}
          {this.state.players.length} people entered, competing to win{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>

        <hr />
        <form onSubmit={this.onSubmit}>
          <h3>Want to try your luck?</h3>
          <div>
            <label>Enter some amount to enter in game : </label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />
        <br></br><br></br>
        <h3>Pick a winner?</h3>
        <p>(only manager can pick a winner)</p>
        <button onClick={this.onClick}>Pick a winner!</button>
        <br></br><br></br>
        <hr />

        <h1>{this.state.message}</h1>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <br></br>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}
export default App;
