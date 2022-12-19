import { Component } from "react";
import { GreeterClient } from "./greet_grpc_web_pb";
import { unary, serverStreaming } from './util'

//חיבור למארח (נתייחס אחר כך לאנגלית המקולקלת...)
const client = new GreeterClient("http://localhost:8080", null, null);

class App extends Component {
  joinHandler = async () => {
    let thing = "";
    const call = prompt("choose which option", 1);
    switch (call) {
      case "1":
        thing = await unary(client)
        break;
      case '2':
        thing = await serverStreaming(client)
        break;
    }
    document.getElementById("demo").innerHTML = thing
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>hi</h1>
          <h2>1. Unary</h2>
          <h2>2. Server Side Streaming</h2>
          <button onClick={this.joinHandler}> press me</button>
          <p id="demo"></p>
        </header>
      </div>
    );
  }
}

export default App;
