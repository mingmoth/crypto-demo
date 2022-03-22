import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import { usePrevious } from '../usePrevious';

const CryptoHeadder = styled.div`
  .crypto-container {
    display: flex;
    align-items: end;
    .crypto-wrapper {
      margin-right: 1em;
      text-align: right;
      .crypto-currency {
        font-size: 22px;
      }
      .crypto-stable {
        font-size: 14px;
      }
    }
    .crypto-price {
      font-size: 2em;
    }
  }
`

function CryptoHead({ etheurPrice, setEtheurPrice }) {
  const lastPrice = usePrevious(etheurPrice)

  useEffect(() => {
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade')
    ws.onmessage = (event) => {
      let etheurData = JSON.parse(event.data)
      setEtheurPrice(parseFloat(etheurData.p).toFixed(2))
    }
  }, )

  return (
    <CryptoHeadder>
      <div className="crypto-container">
        <div className="crypto-wrapper">
          <div className='crypto-currency'>ETH</div>
          <div className="crypto-stable">USDT</div>
        </div>
        <div className="crypto-price" style={{ color: !etheurPrice || etheurPrice === lastPrice ? 'white' : etheurPrice > lastPrice ? 'green' : 'red' }}>{etheurPrice}</div>
      </div>
    </CryptoHeadder>
  )
}

export default CryptoHead