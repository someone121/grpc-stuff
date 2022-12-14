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

    client.orderIceCream(iceCreamRequest, function (err, response) {
      console.log('hi');
      if (err) {
        console.log('this thing broke!', err);
      } else {
        console.log('response from me:', response.getMessage());
        return response.getMessage()
      }
    })
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
