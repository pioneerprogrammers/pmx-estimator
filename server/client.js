import React from 'react';
import siteLogo from '../../assets/images/logo/site-logo.png';
import DotsLoader from '../../shared/Loader/DotsLoader';
import './Home.css';

const Home = () => {
    return (
        <section className='hero-section'>
            <img className='site-logo' src={siteLogo} alt="" />
            <p>Get an accurate estimate of your construction project costs with our AI-powered estimator. Enter your project details below and let our advanced algorithms do the work for you. It's quick, easy, and hassle-free!</p>
            <form>
                <div className="hero-flex-container">
                    <div className="hero-flex-item">
                        <div>
                            <select className='residential' name="residential">
                                <option value="residential">Residential</option>
                                <option value="residential-ii">Residential 2</option>
                                <option value="residential-iii">Residential 3</option>
                            </select>
                            <input type="text" name="" id="" placeholder='Your Name' />
                            <label className='common-label' htmlFor="feet">Country</label>
                            <input type="text" name="" id="" placeholder='Your Name' />
                            <label className='common-label' htmlFor="feet">City</label>
                            <input type="text" name="" id="" placeholder='Your Name' />
                            <label className='common-label' htmlFor="feet">Total Sqaure feet</label>
                            <input type="text" name="" id="" placeholder='Your Name' />
                        </div>
                    </div>
                    <div className="hero-flex-item">
                        <div>
                            <div className="input-group">
                                <label className="common-label" htmlFor="bedrooms">Number of Bedrooms</label>
                                <input className='num-input' type="number" name="" id="" />
                            </div>
                            <div className="input-group">
                                <label className="common-label" htmlFor="bathrooms">Number of Bathrooms</label>
                                <input className='num-input' type="number" name="" id="" />
                            </div>
                            <label className="common-label" id='inclusives' htmlFor="inclusives">Other Inclusives</label>
                            <div className="input-group">
                                <label htmlFor="kitchen">Kitchen</label>
                                <input className='common-checkbox' type="checkbox" name="" />
                                <label htmlFor="porch">Porch</label>
                                <input className='common-checkbox' type="checkbox" name="" />
                            </div>
                            <div className="input-group" id='checkbox-group'>
                                <label htmlFor="dining">Dining room</label>
                                <input className='common-checkbox' type="checkbox" name="" />
                                <label htmlFor="living">Living room</label>
                                <input className='common-checkbox' type="checkbox" name="" />
                            </div>
                            <div className="input-group" id='currency'>
                                <label className="common-label" htmlFor="bathrooms">Prefered Currency</label>
                                <select className='currency' name="currency">
                                    <option value="inr">INR</option>
                                    <option value="usd">USD</option>
                                    <option value="bdt">BDT</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='estimate-btn-container'>
                    <input className='estimate-btn' type="submit" value="ESTIMATE" />
                </div> */}
                <div className='estimating-btn-container'>
                    <input className='estimating-btn' type="submit" value="ESTIMATING" />
                    <DotsLoader />
                </div>
            </form>
        </section>
    )
}

export default Home;