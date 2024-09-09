import React from 'react';
import Button from "../../../common/Button/Button";
import { useNavigate } from 'react-router-dom';
import "./AsMentioned.css";

function NotMentioned(props) {
    let { NFTs, count, singleNFT, setNFT, maxOwned, accountAddress, contract } = props;

    const backToHome = useNavigate();

    return (
        <div>
            <div className="nft-grid">
            {NFTs.length > 0 && NFTs.map((nft) => {
                console.log("Not Mentioned");
                console.log(accountAddress);
                console.log(nft);
                if(!nft[4] && nft[6] !== maxOwned){
                    return(
                        <div key={count} className="nft-card">
                            <img className="nft-single" src={nft[5]} alt={nft[2]} />
                            <p className='token-number'>NFT Number: {count++}</p>
                            {accountAddress.toUpperCase() !== nft[1].toUpperCase() ? !nft[7] ? <Button className="buying-price" btnType='PRIMARY' btnText='BUY' btnOnClick={() => {
                                setNFT(nft);
                                singleNFT("/single");
                              }} /> : <Button className="buying-price" btnType='PRIMARY' btnText='Bid' btnOnClick={() => {
                                props.setNFT(nft);
                                // setCount(count);
                                singleNFT("/single");
                              }} /> : <Button className="buying-price" btnType='PRIMARY' btnText='Visit' btnOnClick={() => {
                                setNFT(nft);
                                singleNFT("/single");
                              }} />}
                              </div>
                            )
                    }
                    // console.log(nft);
                })
            }
            </div>
            </div>
        )
}

export default NotMentioned;

        // <Button className="buying-price" btnType='PRIMARY' btnText='BUY' btnOnClick={() => {
        //         props.setNFT(nft);
        //         singleNFT("/single");
        // }} />
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
                            //       console.log(currentDateTime);
                            //       let min = (parseInt(minute) + 2);
                            //       console.log(minute);
                            //       let finalMin = min.toString();
                                  
                            //       let finalDateTime = currentDateTime.replace(minute,finalMin);
                            //       // setEndtime(finalDateTime);
                            //       await contract.startAuction(count - 1, finalDateTime);
                            //     }}  /> : console.log("Not Applicable") : console.log("Error")
                            // }