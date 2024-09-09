import React from 'react';
import "./header.css";
import ConnectWallet from '../ConnectWallet/ConnectWallet'

const Header = (props) => {
  return (
    <div className='h absolute-center'>
      <div className='header cur-po'>
        <span className='heading-gradient'>Marketplace</span>
      </div>
      <div>
        <ConnectWallet sethaveMetamask={props.sethaveMetamask} setAccountAddress={props.setAccountAddress} setAccountBalance={props.setAccountBalance} setIsConnected={props.setIsConnected} setProvider={props.setProvider} accountAddress={props.accountAddress} />
      </div>
    </div>
  )
}

export default Header