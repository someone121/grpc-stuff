import { Component } from 'react';
import { IceCreamClient } from './proto/ice_cream_grpc_web_pb'
import { IceCreamRequest } from './proto/ice_cream_pb';

const client = new IceCreamClient(
  "http://localhost:8080",
  null,
  null
)

class App extends Component {
joinHandler = () => {
    const iceCreamRequest = new IceCreamRequest()
    iceCreamRequest.setScoops(3)
    iceCreamRequest.setFlavor('strawberry')

    client.orderIceCream(iceCreamRequest, {}, (err, Res) => {
      if (Res == null) {
        console.log(err)
      }else {
        console.log(Res.array[0])
      }
    });
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
