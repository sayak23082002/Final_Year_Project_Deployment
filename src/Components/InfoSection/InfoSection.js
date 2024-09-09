import React from 'react'
import "./infoSection.css"
import InfoItem from './InfoItem/InfoItem'
import INFO_ITEMS from "../../data/infoItems"

const Infosection = () => {
  return (
    <div className='info-section'>
      <div className='is-heading absolute-center'>
        <span className='heading-gradient'> Create and sell your NFTs</span>
      </div>
      <div className='is-items-container'>
        {INFO_ITEMS.map((_infoItem) => {
          return(
            <InfoItem item={_infoItem}/>
          )
        })}
      </div>
    </div>
  )
}

export default Infosection