import "./NFTListing.css";
import Button from "../../common/Button/Button";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import AsMentioned from "./Recomendations/AsMentioned";
import NotMentioned from "./Recomendations/NotMentioned";



const NFTListing = (props) => {
  // Hardcoded NFT data with photo URLs

  const {contract, setMaxOwned, accountAddress, mentionedNFTs, notMentionedNFTs, setCount} = props;

  const singleNFT = useNavigate();

  const backToHome = useNavigate();

  const [NFTs, setNFTs] = useState([[]]);
  
  const [personalNFTs, setPersonalNFTs] = useState([[]]);

  useEffect(() => {
    const getData = async () => {
      if(contract){
        const nft = await contract.fetchMarketItem();
        setNFTs(nft);
        const personalNFT = await contract.fetchMyNFT();
        setPersonalNFTs(personalNFT);
      }else{
        backToHome("/");
      }
    }
    getData();
  }, [contract, accountAddress])

  let count = 1;

  // var button;

  // try{
  //   if(accountAddress.toUpperCase() === nft[1].toUpperCase()){
  //     var semiButton;
  //     if(nft[7]){
  //       semiButton = <Button className="buying-price" btnType='PRIMARY' btnText='End Auction' btnOnClick={() => {
  //         props.setNFT(nft);
  //         setMaxOwned(nft[6]);
  //         setCount(count);
  //         singleNFT("/single");
  //       }} />
  //     }else{
  //       semiButton = <Button className="buying-price" btnType='PRIMARY' btnText='Start Auction' btnOnClick={async () => {
  //         // if(response){
  //           alert("Auction Started!!!");
  //           backToHome("/");
  //           const now = new Date();
  //           const currentDateTime = now.toLocaleString(); // output: "7/20/2021, 2:28:15 PM"
  //           let minute;

  //           for (let i = 0; i < currentDateTime.length; i++) {
  //             if(currentDateTime[i]==':'){
  //               minute = currentDateTime.substring(i+1, i+3);  
  //               break;
  //             }
  //           }
  //           // console.log(currentDateTime);
  //           let min = (parseInt(minute) + 2);
  //           // console.log(minute);
  //           let finalMin = min.toString();
            
  //           let finalDateTime = currentDateTime.replace(minute,finalMin);
  //           // setEndtime(finalDateTime);
  //           await contract.startAuction(count - 1, finalDateTime);
  //         }}  />
  //     }
  //     button = 
  //     <div>
  //       <Button className="buying-price" btnType='PRIMARY' btnText='Visit' btnOnClick={() => {
  //         props.setNFT(nft);
  //         setMaxOwned(nft[6]);
  //         setCount(count);
  //         singleNFT("/single");
  //       }} />
  //       {semiButton}
  //     </div> 
  //   }else{
  //     var semiButton;
  //     if(nft[7]){
  //       semiButton = <Button className="buying-price" btnType='PRIMARY' btnText='Bid' btnOnClick={() => {
  //         props.setNFT(nft);
  //         setMaxOwned(nft[6]);
  //         setCount(count);
  //         singleNFT("/single");
  //       }} />
  //     }else{
  //       button = <Button className="buying-price" btnType='PRIMARY' btnText='BUY' btnOnClick={() => {
  //         props.setNFT(nft);
  //         setMaxOwned(nft[6]);
  //         setCount(count);
  //         singleNFT("/single");
  //       }} />
  //     }
  //   }
  // }catch(e){

  // }

  try{
    return (
      <div className="nft-listing absolute-center">
        <h2 className="heading">NFT Listing</h2>
        <h2 className="heading">Your NFTs</h2>
        <div className="nft-grid">
        {personalNFTs.length > 0 ? personalNFTs.map((nft) => {
          if(nft[4]){
            return(
              <div key={count} className="nft-card">
                <img className="nft-single" src={nft[5]} alt={nft[2]} />
                <p className='token-number'>NFT Number: {count++}</p>
                <Button className="buying-price" btnType='PRIMARY' btnText='Resell' btnOnClick={() => {
                  props.setNFT(nft);
                  setMaxOwned(nft[6]);
                  setCount(count);
                  singleNFT("/single");
                }} />
              </div>
            )
          }
        }): <h1 className="absolute-center">You don't have any NFT, Buy now</h1>
        }
        </div>
        {props.maxOwned.length === 0 ? 
          <div className="nft-listing absolute-center">
            <h2 className="heading">Unsold NFTs</h2>
            <div className="nft-grid"> 
              {NFTs.map((nft) => {
                if(!nft[4]){
                  return(
                    <div key={count} className="nft-card">
                      <img className="nft-single" src={nft[5]} alt={nft[2]} />
                      <p className='token-number'>NFT Number: {count++}</p>
                      {accountAddress.toUpperCase() !== nft[1].toUpperCase() ? !nft[7] ? <Button className="buying-price" btnType='PRIMARY' btnText='BUY' btnOnClick={() => {
                        props.setNFT(nft);
                        setMaxOwned(nft[6]);
                        setCount(count);
                        singleNFT("/single");
                      }} /> : <Button className="buying-price" btnType='PRIMARY' btnText='Bid' btnOnClick={() => {
                        props.setNFT(nft);
                        setMaxOwned(nft[6]);
                        setCount(count);
                        singleNFT("/single");
                      }} /> : <Button className="buying-price" btnType='PRIMARY' btnText='Visit' btnOnClick={() => {
                        props.setNFT(nft);
                        setMaxOwned(nft[6]);
                        setCount(count);
                        singleNFT("/single");
                      }} />}
                      </div>
                    )
                }
              })} 
            </div>
          </div>: 
        <div>
          <h2 className="heading">Unsold NFTs As Your Preference</h2>
          <AsMentioned NFTs={mentionedNFTs} count={count} singleNFT={singleNFT} setNFT={props.setNFT} maxOwned={props.maxOwned} accountAddress={accountAddress} contract={contract} />
          <h2 className="heading">Other Unsold NFTs</h2>
          <NotMentioned NFTs={notMentionedNFTs} count={count} singleNFT={singleNFT} setNFT={props.setNFT} maxOwned={props.maxOwned} accountAddress={accountAddress} contract={contract} />
        </div>
        }
        <div className='backBtn'>
          <Button btnType='SECONDARY' btnText='HOME' btnOnClick={() => backToHome("/")} />
        </div>
      </div>
    );
  }catch(error){
    backToHome("/");
  }
};

export default NFTListing;
                    // {accountAddress.length !== 0 && accountAddress.toUpperCase() === nft[1].toUpperCase() ? !nft[7] ? 
                    //   <Button className="buying-price" btnType='PRIMARY' btnText='Start Auction' btnOnClick={async () => {
                    //     // if(response){
                    //       alert("Auction Started!!!");
                    //       backToHome("/");
                    //       const now = new Date();
                    //       const currentDateTime = now.toLocaleString(); // output: "7/20/2021, 2:28:15 PM"
                    //       let minute;

                    //       for (let i = 0; i < currentDateTime.length; i++) {
                    //         if(currentDateTime[i]==':'){
                    //           minute = currentDateTime.substring(i+1, i+3);  
                    //           break;
                    //         }
                    //       }
                    //       // console.log(currentDateTime);
                    //       let min = (parseInt(minute) + 2);
                    //       // console.log(minute);
                    //       let finalMin = min.toString();
                          
                    //       let finalDateTime = currentDateTime.replace(minute,finalMin);
                    //       // setEndtime(finalDateTime);
                    //       // console.log(count - 1);
                    //       await contract.startAuction(count - 1, finalDateTime);
                    //     }}  /> : console.log("Not Applicable") : console.log("Error")
                    // }