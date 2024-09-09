import React from 'react'
import "./brandIntegration.css"

const BrandIntegration = () => {
  return (
    <div className='brands-integration absolute-center'>
      <img src={require('../../assets/sample.png')} className='bi-logos' alt='brand-logos'/>
    </div>
  )
}

export default BrandIntegration