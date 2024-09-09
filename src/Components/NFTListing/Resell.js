import React, { useEffect } from 'react';
// import "./SingleNFTPage.css";
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const SingleNFTPage = (props) => {

  const {NFT, contract, accountBalance, accountAddress} = props;

  const backToHome = useNavigate();
  const listingPage = useNavigate();

  let owners;
  useEffect(() => {
    const seeAllOwners = async () => {
      if(contract){
        owners = await contract.getAllOwners(NFT.tokenId);
      }else{
        alert("Connect metamask first");
        backToHome("/");
      }
    }
    seeAllOwners();
  })



  const buyingNFT = async () => {
    const cost = Number(NFT.price) + 0.0015;
    const valueToSend = ethers.utils.parseEther(`${cost}`)
    console.log(cost);
    if(accountBalance > NFT.price){
      const result = await contract.createMarketSale(NFT.tokenId, {
        value: valueToSend,
        gasLimit: 3000000,
      });
      console.log(result);
    }else{
      alert("Not Enough Money")
    }
  }

  const nftNotSelected = () => {
    alert("First select a NFT.");
    listingPage("/listing");
  }


  return (
    <div>
      <div className="container">
        <div className="right-box">
          <div className="main-image-box">
            <img src={NFT !== null ? `${NFT.link}` : nftNotSelected()} id="mainImage" className="main-image" />
          </div>
        </div>
        <div className="details-box">
          <h3>Price : {NFT !== null ? `${NFT.price}` : nftNotSelected()} eth</h3>
          <br />
          <h3>Owner : {NFT !== null ? `${NFT.seller}` : nftNotSelected()}</h3>
          <br />
          <h3>Previous Owners : {owners > 0 ? owners.map((owner) => {
            return(
              <div>
                <h3>{owner}</h3>
                <br />
              </div>
            )
          }) : `No owners`}</h3>
          <button onClick={buyingNFT}>Buy</button>
        </div>
      </div>
      <div className="absolute-center">
        <Button btnType='SECONDARY' btnText='HOME' btnOnClick={() => backToHome("/")} />
        <Button btnType='SECONDARY' btnText='Listing Page' btnOnClick={() => listingPage("/listing")} />
      </div>
    </div>
  )
}

export default SingleNFTPage