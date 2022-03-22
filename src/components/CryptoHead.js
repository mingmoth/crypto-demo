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

function CryptoHead({ cryptoCurrency, stableCoin, cryptoPrice, setCryptoPrice }) {
  const lastPrice = usePrevious(cryptoPrice)
  let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${cryptoCurrency}${stableCoin}@trade`)
  useEffect(() => {
    
    ws.onmessage = (event) => {
      let etheurData = JSON.parse(event.data)
      // console.log(etheurData.p)
      setCryptoPrice(parseFloat(etheurData.p).toFixed(2))
    }
  });

  return (
    <CryptoHeadder>
      <div className="crypto-container">
        <div className="crypto-wrapper">
          <div className='crypto-currency'>{cryptoCurrency.toUpperCase()}</div>
          <div className="crypto-stable">{stableCoin.toUpperCase()}</div>
        </div>
        <div className="crypto-price" style={{ color: !cryptoPrice || !lastPrice || cryptoPrice === lastPrice ? 'white' : cryptoPrice > lastPrice ? 'green' : 'red' }}>{cryptoPrice}</div>
      </div>
    </CryptoHeadder>
  )
}

export default CryptoHead