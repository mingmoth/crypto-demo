import React, { useState } from 'react';
import styled from '@emotion/styled';

import CryptoHead from './components/CryptoHead'
import CryptoSetting from './components/CryptoSetting';

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

function App() {
  const [currentPage, setCurrentPage] = useState('CryptoCard')
  const [cryptoCurrency, setCryptoCurrency] = useState('eth')
  const [stableCoin, setStableCoin] = useState('usdt')
  const [cryptoPrice, setCryptoPrice] = useState()

  
  return (
    <div className="App">
      {currentPage === "CryptoCard" && (
        <CryptoCard>
          <Cog onClick={() => setCurrentPage("CryptoSetting")}/>
          <CryptoHead cryptoCurrency={cryptoCurrency} stableCoin={stableCoin} cryptoPrice={cryptoPrice} setCryptoPrice={setCryptoPrice} >
          </CryptoHead>
        </CryptoCard>
      )}
      {currentPage === "CryptoSetting" && (
        <CryptoSetting setCurrentPage={setCurrentPage} cryptoCurrency={cryptoCurrency} setCryptoCurrency={setCryptoCurrency} stableCoin={stableCoin} setStableCoin={setStableCoin} />
      )}
    </div>
  );
}

export default App;
