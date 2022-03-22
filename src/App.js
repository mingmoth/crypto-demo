import React, { useState } from 'react';
import styled from '@emotion/styled';

import CryptoHead from './components/CryptoHead'

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
  const [etheurPrice, setEtheurPrice] = useState()

  return (
    <div className="App">
      <CryptoCard>
        <Cog />
        <CryptoHead etheurPrice={etheurPrice} setEtheurPrice={setEtheurPrice} >
        </CryptoHead>
      </CryptoCard>
    </div>
  );
}

export default App;
