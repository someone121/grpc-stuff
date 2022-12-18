import { Component } from 'react';
import { GreeterClient } from './greet_grpc_web_pb'
import { HelloRequest, HelloReply, DelayedReply } from './greet_pb';

const client = new GreeterClient(
  "http://localhost:8080",
  null,
  null
)

class App extends Component {
joinHandler = () => {
  
  }
  

  render() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>hi</h1>
      <button
      onClick={this.joinHandler}> press me</button>
      </header>
    </div>
  );
}}

export default App;