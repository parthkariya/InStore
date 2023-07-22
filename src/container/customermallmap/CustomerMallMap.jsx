import React from 'react'
import "./CustomerMallMap.css"
import { BiArrowToBottom } from 'react-icons/bi'
import { CustomerHeroSecond } from '../../components'

const CustomerMallMap = ({ getsingalmalldata, setTab }) => {
    return (
        <div>
            <CustomerHeroSecond />
            <div className="mm_main_wrapp">
                <div className="profile_head_center" style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <h4 className="h3" style={{ textTransform: "capitalize" }}>V&A Waterfront map </h4>
                </div>
                <div className='cus-mall-map'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.80351149256!2d70.82129635!3d22.27348695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1688451528241!5m2!1sen!2sin" width="600" height="550" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='cus-mall-map'></iframe>

                    <div className="download-map-btn-part">
                        <button className="download-map-btn">Download Map PDF</button>
                        <BiArrowToBottom className="download-map-icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerMallMap