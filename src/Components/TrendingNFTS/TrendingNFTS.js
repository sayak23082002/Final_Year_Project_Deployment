import React from 'react'
import "./trendingNFTS.css"
import Slider from 'react-slick'
import TRENDING_NFTS from "../../data/trendingNFTs";
import TrendingCards from "./TrendingCards/TrendingCards";
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';

const settings = {
  slidesToShow: 3,
  slidesToScroll: 1,
  autoPlay: true,
  speed: 5,
  arrow: true,
};

const TrendingNFTS = () => {

  const explore = useNavigate();

  return (
    <div className='trending-nfts'>
      <div className='tn-title absolute-center'>
        <span className='heading-gradient'>Trending NFTs</span>
      </div>
      <div className='tn-bg-blob'></div>
      <Slider {...settings}> 
        {TRENDING_NFTS.map((_nfts) => {
          return(
            <TrendingCards nft={_nfts} />
          )
        }
        )}
      </Slider>
      <br />
      <div className='seemore-btn absolute-center'>
        <Button btnText='SEE MORE' btnOnClick={() => explore("/trending_page")}></Button>
      </div>
    </div>
  )
}

export default TrendingNFTS


//<div className='tn-btn absolute-center'>
// <Button btnText='SEE MORE' type='Secondary' btnOnClick={() => explore("/listing")} customClass='seemore-btn'></Button>
// </div>