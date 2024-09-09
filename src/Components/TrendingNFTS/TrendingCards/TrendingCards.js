import React from 'react'
import "./TrendingCards.css"

const TrendingCards = (props) => {
  const {nft} = props;
  return (
    <div className='trending-card absolute-center'>
      <div className='tc-inner-wrapper'>
        <div className='tc-content'>
          <img alt={nft.user_name} src={nft.banner} className='tc-banner'/>
          <div className='tc-user-info'>
            <div className='tc-ui-left'>
              <img alt={nft.user_name} className='tc-user-logo' src={nft.user_photo}/>
            </div>
            <div>
              <div className='tc-ui-username'>{nft.user_name}</div>
              <div className='tc-ui-userhandle'>{nft.userhandle}</div>
            </div>
            <img alt='ETH ON SOLANA' className='tc-solana-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/512px-Ethereum-icon-purple.svg.png?20200227011040'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingCards