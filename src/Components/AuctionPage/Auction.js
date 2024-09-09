import "./Auction.css";
import Button from "../../common/Button/Button";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
// import AsMentioned from "./Recomendations/AsMentioned";
// import NotMentioned from "./Recomendations/NotMentioned";



const Auction = (props) => {
    // Hardcoded NFT data with photo URLs

    const {accountAddress, setNFT, contract, setMaxOwned } = props;

    const singleNFT = useNavigate();

    const backToHome = useNavigate();

    const [NFTs, setNFTs] = useState([[]]);

    // const [personalNFTs, setPersonalNFTs] = useState([[]]);

    useEffect(() => {
        const getData = async () => {
            if (contract) {
                const nft = await contract.fetchMarketItem();
                setNFTs(nft);
                // const personalNFT = await contract.fetchMyNFT();
                // setPersonalNFTs(personalNFT);
            } else {
                backToHome("/");
            }
        }
        getData();
    }, [backToHome, contract])

    let count = 1;


    return (
        <div className="nft-listing absolute-center">
            <h2 className="heading">NFTs For Auction</h2>
                <div className="nft-listing absolute-center">
                    <div className="nft-grid">
                        {NFTs.map((nft) => {
                            console.log(nft[7]);
                            console.log(accountAddress);
                            if (nft[7]) {
                                return (
                                    <div key={count} className="nft-card">
                                        <img className="nft-single" src={nft[5]} alt={nft[2]} />
                                        <p className='token-number'>NFT Number: {count++}</p>
                                        {
                                            accountAddress.toUpperCase() !== nft[1].toUpperCase() ? 
                                            <div>
                                                <Button className="buying-price" btnType='PRIMARY' btnText='Start Bidding' btnOnClick={() => {
                                                setNFT(nft);
                                                setMaxOwned(nft[6]);
                                                singleNFT("/single");
                                                }} /> 
                                            </div>: console.log("Not applicable")
                                        }
                                        {
                                            accountAddress.toUpperCase() === nft[1].toUpperCase() ? 
                                            <div>
                                            <Button className="buying-price" btnType='PRIMARY' btnText='End Auction' btnOnClick={() => {
                                                setNFT(nft);
                                                setMaxOwned(nft[6]);
                                                singleNFT("/single");
                                            }} /> 
                                            </div>: console.log("Not applicable")
                                        }
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            <div className='backBtn'>
                <Button btnType='SECONDARY' btnText='HOME' btnOnClick={() => backToHome("/")} />
            </div>
        </div>
    );
};

export default Auction;