import React, { useEffect, useState } from 'react';
import "./SingleNFTPage.css";
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import AsMentioned from '../NFTListing/Recomendations/AsMentioned';

const SingleNFTPage = (props) => {

  const { NFTs, setNFT, maxOwned, NFT, contract, accountBalance, accountAddress, count} = props;

  const [endTime, setEndTime] = useState([]);

  const backToHome = useNavigate();
  const listingPage = useNavigate();

  useEffect(() => {
    const seeAllOwners = async () => {
      try {
        setEndTime(await contract.actualEnd(NFT.tokenId));
      } catch(e) {
        backToHome("/");
      }
    }
    seeAllOwners();
  }, [])



  const buyingNFT = async () => {
    try {
      const cost = Number(NFT.price) + 0.0015;
      console.log(NFT.price);
      const valueToSend = ethers.utils.parseEther(`${cost}`)
      // console.log(cost);
      if (accountBalance > cost) {
        const result = await contract.createMarketSale(NFT.tokenId, {
          value: valueToSend,
          gasLimit: 3000000,
        });
        alert("NFT Buying Successful!!!");
        // console.log(result);
      }
    } catch {
      backToHome("/");
    }
  }

  const placeBid = async (e) => {
    try {
      e.preventDefault();
      // console.log(Number(e.target[0].value));
      const cost = (Number(NFT.highestPayableBid) / 1000000000000000000) + Number(e.target[0].value);
      // console.log(Number(NFT.highestPayableBid));
      const valueToSend = ethers.utils.parseEther(`${cost}`);
      // console.log(valueToSend);
      if (accountBalance > cost) {
      // console.log(contract)
      await contract.placeBid(NFT.tokenId, {
          value: valueToSend,
          gasLimit: 9000000,
        });
      // console.log(res);
      alert("Bid Placed Successfully!!!");
      e.preventDefault();
      // console.log(result);
      }
    } catch(e) {
      console.log(e);
      alert(e);
    }
  }

  const resellNFT = async (e) => {
    try {
      // console.log(typeof(e.target[0].value));
      e.preventDefault();
      const cost = 0.0015;
      const valueToSend = ethers.utils.parseEther(`${cost}`)
      // console.log(cost);
      // if(accountBalance > valueToSend){
      const result = await contract.reSellToken(NFT.tokenId, e.target[0].value, {
        value: valueToSend,
        gasLimit: 9000000,
      });
      alert("Uploaded for Resell Successfully!!!");
      // console.log(result);
      // }
    } catch {
      backToHome("/");
    }
  }

  // const nftNotSelected = () => {
  //   listingPage("/listing");
  // }

  var button;

  try{
    if(!NFT[4]){
      if(!NFT[7]){
        if(accountAddress.toUpperCase() === NFT.seller.toUpperCase()){
          button = <Button className="buying-price" btnType='PRIMARY' btnText='Start Auction' btnOnClick={async () => {
            // if(response){
              const now = new Date();
              const currentDateTime = now.toLocaleString(); // output: "7/20/2021, 2:28:15 PM"
              let minute;

              for (let i = 0; i < currentDateTime.length; i++) {
                if(currentDateTime[i]==':'){
                  minute = currentDateTime.substring(i+1, i+3);  
                  break;
                }
              }
              // console.log(currentDateTime);
              let min = (parseInt(minute) + 2);
              // console.log(minute);
              let finalMin = min.toString();
              
              let finalDateTime = currentDateTime.replace(minute,finalMin);
              console.log(NFT.tokenId);
              // setEndtime(finalDateTime);
              await contract.startAuction(NFT.tokenId, finalDateTime);
              alert("Auction Started!!!");
              // backToHome("/");
            }}  />
        }else{
          button = <button type="button" className="btn btn-success" onClick={buyingNFT}>Buy</button>
        }
      }else{
        if(accountAddress.toUpperCase() === NFT.seller.toUpperCase()){
          button = <button type="button" className="btn btn-success" onClick={async () => {await contract.EndAuc(NFT.tokenId, {
            gasLimit: 3000000,
          });
          alert("Auction has ended");
          listingPage("/listing");
          }}>End Auction</button>
        }else{
          button = <div>
            <form onSubmit={placeBid}>
              <input type="text" placeholder='Place bidding amount' />
              <button  type='submit' className="btn btn-success" >Bid On</button>
            </form>
          </div>
        }
      }
    }else{
      if(accountAddress.toUpperCase() === NFT.owner.toUpperCase()){
        button = <form action="#" onSubmit={resellNFT}>
          <br />
          <div>
            <h3>Enter the price :</h3>
            <br />
            <input className="price" type="text" placeholder="e.i. 1" required />
          </div>
          <button>Resell</button>
        </form>
      }
    }
  }catch(e){
    console.log(e);
  }


    return (
      NFT !== null ?
      <div>
        <div className="container">
          <div className="right-box">
            <div className="main-image-box">
              <img src={`${NFT.link}`} id="mainImage" className="main-image" alt="img" />
            </div>
          </div>
          <div className="details-box">
            <h3>Token Id : {`${NFT.tokenId}`}</h3>
            <br />
            <h3>Price : {`${NFT.price}`} eth</h3>
            <br />
            <h3>Current Owner : </h3>
            <br />
            <h3>{`${NFT.seller}`}</h3>
            <br />
            <h2>
              <label>End Auction after : </label>
              <label>{endTime}</label>
            </h2>
            <h2>
              <label>Highest Bid Amount : </label>
              <label>{`${NFT.highestPayableBid / 1000000000000000000} ETH`}</label>
            </h2>
            {button}
            </div>
            </div>
        <div>
          <h2 className="heading">All the NFTs similer to that</h2>
          <AsMentioned NFTs={NFTs} setNFT={setNFT} maxOwned={maxOwned} accountAddress={accountAddress} contract={contract} />
        </div>
        <div className="absolute-center">
          <Button btnType='SECONDARY' btnText='Listing Page' btnOnClick={() => listingPage("/listing")} />
        </div>
      </div> : backToHome("/")
    )
}

export default SingleNFTPage
            // {!NFT[4] ? <button disabled = {NFT[7]} type="button" className="btn btn-success" onClick={buyingNFT}>Buy</button> :
            //   <form action="#" onSubmit={resellNFT}>
            //     <br />
            //     <div>
            //       <h3>Enter the price :</h3>
            //       <br />
            //       <input className="price" type="text" placeholder="e.i. 1" required />
            //     </div>
            //     <button>Resell</button>
            //   </form>}
            //   {accountAddress.toUpperCase() === NFT.seller.toUpperCase() ? <button disabled={!NFT[7]} type="button" className="btn btn-success" onClick={async () => {await contract.EndAuc(NFT.tokenId, {
            //     gasLimit: 3000000,
            //   });
            //   alert("Auction has ended");
            //   listingPage("/listing");
            // }}>End Auction</button> : 
            // <div>
            //   <form onSubmit={placeBid}>
            //     <input type="text" placeholder='Place bidding amount' />
            //     <button  type='submit' className="btn btn-success" >Bid On</button>
            //   </form>
            // </div>}