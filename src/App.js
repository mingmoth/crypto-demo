import React, { useState, useEffect } from 'react';
import { usePrevious } from './usePrevious';
import styled from '@emotion/styled';

import { ReactComponent as CogIcon } from './assets/cog.svg';

import './App.css';

const CryptoCard = styled.div`
  position: relative;
  width: 360px;
  height: 360px;
  box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15);
  background-color: #121416;
  box-sizing: border-box;
  padding: 15px;
  text-align: start;
  color: white;
`

const Cog = styled(CogIcon)`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`

const CryptoHead = styled.div`
  
`

function App() {
  const [etheurPrice, setEtheurPrice] = useState()
  const lastPrice = usePrevious(etheurPrice)

  useEffect(() => {
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade')
    ws.onmessage = (event) => {
      let etheurData = JSON.parse(event.data)
      setEtheurPrice(parseFloat(etheurData.p).toFixed(2))
    }
  }, [etheurPrice])

  return (
    <div className="App">
      <CryptoCard>
        <Cog />
        <CryptoHead>
          <p style={{ margin: 'none' }}>
            ETH <span style={{ color: !etheurPrice || etheurPrice === lastPrice ? 'white' : etheurPrice > lastPrice ? 'green' : 'red' }}>{etheurPrice}</span>
          </p>
        </CryptoHead>
      </CryptoCard>
    </div>
  );
}

export default App;
