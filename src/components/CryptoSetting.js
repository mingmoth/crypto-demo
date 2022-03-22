import React, { useState } from 'react'
import styled from '@emotion/styled'

const CryptoSettingWrapper = styled.div`
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

const Title = styled.div`
  font-size: 28px;
  margin-bottom: 30px;
`

const StyleLabel = styled.label`
  display: block;
  font-size:16px;
  margin-bottom: 15px;
`

const StyleInputList = styled.input`
  display: block;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid white;
  outline: none;
  width: 100%;
  max-width: 100%;
  font-size: 16px;
  color: white;
  padding: 7px 10px;
  margin-bottom: 40px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    margin: 0;
    letter-spacing: 0.3px;
    line-height: 1;
    cursor: pointer;
    overflow: visible;
    text-transform: none;
    border: 1px solid transparent;
    background-color: transparent;
    height: 35px;
    width: 80px;
    border-radius: 5px;

    &:focus,
    &.focus {
      outline: 0;
      box-shadow: none;
    }

    &::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }
  }
`;

const Back = styled.button`
  && {
    color: white;
    border-color: white;
  }
`;

const Save = styled.button`
  && {
    color: white;
    background-color: #40a9f3;
  }
`;

const currencies = ['btc', 'eth', 'doge']

const stables = ['usdt', 'busd', 'ust']

function CryptoSetting({ setCurrentPage, cryptoCurrency, setCryptoCurrency, stableCoin, setStableCoin }) {
  const [currencyName, setCurrencyName] = useState(cryptoCurrency)
  const [stableName, setStableName] = useState(stableCoin)

  let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${cryptoCurrency}${stableCoin}@trade`)
  ws.close()

  const handleCurrency = (e) => {
    setCurrencyName(e.target.value.toLowerCase())
  }

  const handleStable = (e) => {
    setStableName(e.target.value.toLowerCase())
  }

  const handleSave = () => {
    if(currencies.includes(currencyName) && stables.includes(stableName)) {
      setCryptoCurrency(currencyName)
      setStableCoin(stableName)
      setCurrentPage('CryptoCard')
    } else {
      alert(`儲存失敗：請輸入的有效的幣別`)
    }
  }

  return (
    <CryptoSettingWrapper>
      <Title>設定</Title>
      <StyleLabel htmlFor='cryptoCurrency'>虛擬貨幣</StyleLabel>
      <StyleInputList 
        list="currency-list" 
        id="cryptoCurrency" 
        name="cryptoCurrency"
        onChange={handleCurrency}
        value={currencyName.toUpperCase()} />
      <datalist id="currency-list">
        {currencies.map(currency => (
          <option value={currency.toUpperCase() } key={currency}></option>
        ))}
      </datalist>

      <StyleLabel htmlFor='stableCoin'>穩定幣</StyleLabel>
      <StyleInputList 
        list="stable-list" 
        id="stableCoin" 
        name="stableCoin"
        onChange={handleStable}
        value={stableName.toUpperCase()} />
      <datalist id="stable-list">
        {stables.map(stable => (
          <option value={stable.toUpperCase()} key={stable}></option>
        ))}
      </datalist>

      <ButtonGroup>
        <Back onClick={() => setCurrentPage("CryptoCard")}>返回</Back>
        <Save onClick={handleSave}>儲存</Save>
      </ButtonGroup>
    </CryptoSettingWrapper>
  )
}

export default CryptoSetting