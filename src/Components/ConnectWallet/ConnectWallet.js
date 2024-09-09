import React from 'react'
import Button from '../../common/Button/Button';
import { useEffect } from 'react';
import { ethers } from 'ethers';

const ConnectWallet = (props) => {

  window.ethereum.on("chainCchanged", () => {
    window.location.reload();
  })

  window.ethereum.on("accountsChanged", () => {
    window.location.reload();
  })

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // const localNodeUrl = 'http://localhost:8545';
  // const provider = new ethers.providers.JsonRpcProvider(localNodeUrl);

  useEffect(() => {
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        props.sethaveMetamask(false);
      }
      props.sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        props.sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      props.setProvider(provider);
      props.setAccountAddress(accounts[0]);
      props.setAccountBalance(bal);
      props.setIsConnected(true);
    } catch (error) {
      props.setIsConnected(false);
    }
  };
  return (
    <div>
        <Button btnType='SECONDARY' btnOnClick={connectWallet} btnText={`${props.accountAddress !== '' ? 'Metamask Connected' : 'Connect Metamask'}`} className='mm-btn' />
      </div>
  )
}

export default ConnectWallet