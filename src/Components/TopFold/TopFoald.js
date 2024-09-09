import React from 'react'
import "./topFoald.css"
import Button from '../../common/Button/Button'
import { useNavigate } from 'react-router-dom'

const TopFoald = () => {

  const exploreNFT = useNavigate();

  const create = useNavigate();

  return (
    <div className='topfold absolute-center' >
      <div className='tf-left'>
        <div className='tf-heading'>
          Discover collect, & sell{" "} <span className='heading-gradient'>Extraordinary</span> NFTs
        </div>
        <div className='tf-decsription'>
        Please make sure that you are buying and selling the most trending NFTs out there. Welcome to NFT MarketPlace using Blockchain Technology...
        </div>
        <div className='tf-left-btns'>
          <Button btnType='PRIMARY' btnText='EXPLORE' btnOnClick={() => exploreNFT("/listing")} />
          <Button btnType='SECONDARY' btnText='CREATE' btnOnClick={() => create("/data")} customClass='tf-left-secondary-btns' />
        </div>
        






      </div>
      <div className='tf-right'>
        <div className='tf-r-bg-blob'>
        </div>
        <div className='tf-right-diamond'>
          <div className='tf-r-diamond-item absolute-center'>
            <img className='tf-r-diamond-img' alt='Diamond-banner' src='https://i.seadn.io/s/raw/files/01719e1b7165406edc028c146e566da8.gif?auto=format&dpr=1&w=128' />
          </div>
          <div className='tf-r-diamond-item absolute-center'>
            <img className='tf-r-diamond-img' alt='Diamond-banner' src='https://i.seadn.io/gcs/files/f77f0f2cc27dd427c69c68e81bfb0b97.gif?auto=format&dpr=1&w=128' />
          </div>
          <div className='tf-r-diamond-item absolute-center'>
            <img className='tf-r-diamond-img' alt='Diamond-banner' src='https://i.seadn.io/s/raw/files/159c490881e7e9a04fb5e1f3c6c96707.gif?auto=format&dpr=1&w=128' />
          </div>
          <div className='tf-r-diamond-item absolute-center'>
            <img className='tf-r-diamond-img' alt='Diamond-banner' src='https://i.seadn.io/gae/N-0Ykz_InP31IMCnBV4gXAjPfXbkoOmENXGZjKRdK6mo2dO-hRcAHHPyQ-oBLcQMgWwzmh06GHeJ5U0yib3IDE9ekrvVc_-qlOWK?auto=format&dpr=1&w=128' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopFoald




// <div className='tf-left-infoStats'>
//           <div className='tf-is-infoItem absolute-center'>
//             <div className='tf-infoItem-count'>200K+</div>
//             <div className='tf-infoItem-lable'>Collections</div>
//           </div>
//           <div className='tf-is-infoItem absolute-center'>
//             <div className='tf-infoItem-count'>10K+</div>
//             <div className='tf-infoItem-lable'>Artist</div>
//           </div>
//           <div className='tf-is-infoItem absolute-center'>
//             <div className='tf-infoItem-count'>423K+</div>
//             <div className='tf-infoItem-lable'>Community</div>
//           </div>
//         </div>