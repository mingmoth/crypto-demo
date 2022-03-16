import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [etheurPrice, setEtheurPrice] = useState()
  const [lastPrice, setLastPrice] = useState()

  useEffect(() => {
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade')
    ws.onmessage = (event) => {
      setLastPrice(etheurPrice)
      let etheurData = JSON.parse(event.data)
      setEtheurPrice(parseFloat(etheurData.p).toFixed(2))
    }
  }, [etheurPrice, lastPrice])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ETH: <span style={{ color: !etheurPrice || etheurPrice===lastPrice? 'white': etheurPrice>lastPrice? 'green' : 'red' }}>{etheurPrice}</span>
        </p>
      </header>
    </div>
  );
}

export default App;
