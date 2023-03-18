import React, { useEffect, useState } from 'react';
import siteLogo from '../../assets/images/logo/site-logo.png';
import DotsLoader from '../../shared/Loader/DotsLoader';
import './Home.css';

const Home = () => {


    // prompt, response and data loading state
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    // selected options states
    const [selectedBuildingType, setSelectedBuildingType] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("inr");

    // selected options handler
    const handleSelectedChange = event => {
        const { name, value } = event.target;

        if (name === "residential") {
            setSelectedBuildingType(value);
        }
        else if (name === "currency") {
            setSelectedCurrency(value);
        }
    };

    // Checkmarked input values state
    const [checkedValues, setCheckedValues] = useState([]);

    // checkmarked input value change handler
    const handleInputChange = event => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add the value to the array of checked values
            setCheckedValues([...checkedValues, value]);
        }
        else {
            // Remove the value from the array of checked values
            setCheckedValues(checkedValues.filter(item => item !== value));
        }
    };

    // loading state and input field filled state
    const [loading, setLoading] = useState(false);
    const [inputFilled, setInputFilled] = useState(false);


    // ==========================


    // form submit handler
    const handleSubmit = event => {
        event.preventDefault();

        // user data from form
        const userData = {
            residential: selectedBuildingType,
            india: event.target.india.value,
            delhi: event.target.delhi.value,
            sqft: event.target.sqft.value,
            bedroom: event.target.bedroom.value,
            bathroom: event.target.bathroom.value,
            kitchen: checkedValues.includes("kitchen"),
            dining: checkedValues.includes("dining"),
            living: checkedValues.includes("living"),
            porch: checkedValues.includes("porch"),
            currency: selectedCurrency
        }
        const isAllEmpty = Object.values(userData).slice(0, -1).every(val => !val);

        if (!isAllEmpty) {

            setInputFilled(true);

            // destructure user data for using in query
            const { residential, india, delhi, sqft, bedroom, bathroom, kitchen, dining, living, porch, currency } = userData;

            // create query by using user data
            const query = `Can you suggest me the detailed estimations in a table of a ${residential} building with to construct in ${delhi}, ${india} with ${bedroom} bedroom, ${bathroom} bathroom${living ? ', living room' : ''}${kitchen ? ', kitchen' : ''}${dining ? ', dining room' : ''}${porch ? ', porch' : ''} of ${sqft} sq feet as stages and activities. then along with the total, display time, number of laborers (mention site engineer number, workers number for stages) and cost (${currency}) for each activity. Don't Mention risks in each activity. Just at the bottom of the table include the potential risks that need to consider.`

            // query set for send it to backend
            setPrompt(query);

            // loading
            setLoading(true);

            // reset form
            event.target.reset();
        }
    }

    // fetch data from api and get response
    useEffect(() => {

        if (prompt === '') {
            return;
        }
        else {
            fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            })
                .then(res => res.json())
                .then(data => {
                    setResponse(data.response); // update response state
                    setLoading(false);
                })
                .catch(error => console.log(error));
        }
        // setInputFilled(false);
    }, [prompt]);

    // After Getting Response from API
    const rows = response.split("\n");
    const filtered = rows.filter(word => word !== '');
    const tableData = filtered?.map(row => row.split("\t"));

    // Separating the Potential Risk from table data
    const potentialRisksIndex = tableData.findIndex(data => data[0] === 'Potential Risks:');
    const restData = potentialRisksIndex !== -1 ? tableData.slice(0, potentialRisksIndex) : tableData;
    const potentialRisks = tableData?.slice(potentialRisksIndex);

    return (
        <section className='hero-section'>
            <img className='site-logo' src={siteLogo} alt="" />
            <p>Get an accurate estimate of your construction project costs with our AI-powered estimator. Enter your project details below and let our advanced algorithms do the work for you. It's quick, easy, and hassle-free!</p>

            <form onSubmit={handleSubmit}>
                <div className="hero-flex-container">
                    <div className="hero-flex-item">
                        <div>
                            <select name="residential" value={selectedBuildingType} onChange={handleSelectedChange} className='residential'>
                                <option value="">Building Type</option>
                                <option value="residential">Residential</option>
                                <option value="commercial">Commercial</option>
                            </select>

                            <label className='common-label' htmlFor="feet">Country</label>
                            <input type="text" name='india' />

                            <label className='common-label' htmlFor="feet">City</label>
                            <input type="text" name='delhi' />

                            <label className='common-label' htmlFor="feet">Total Sqaure feet</label>
                            <input type="text" name='sqft' />
                        </div>
                    </div>

                    <div className="hero-flex-item">
                        <div>
                            <div className="input-group">
                                <label className="common-label" htmlFor="bedrooms">Number of Bedrooms</label>
                                <input type="number" name='bedroom' className='num-input' />
                            </div>

                            <div className="input-group">
                                <label className="common-label" htmlFor="bathrooms">Number of Bathrooms</label>
                                <input type="number" name='bathroom' className='num-input' />
                            </div>

                            <label className="common-label" id='inclusives' htmlFor="inclusives">Other Inclusives</label>
                            <div className="input-group">
                                <label htmlFor="kitchen">Kitchen</label>
                                <input type="checkbox" value="kitchen" onChange={handleInputChange} className='common-checkbox' name="" />
                                <label htmlFor="porch">Porch</label>
                                <input type="checkbox" value="porch" onChange={handleInputChange} className='common-checkbox' name="" />
                            </div>

                            <div className="input-group" id='checkbox-group'>
                                <label htmlFor="dining">Dining room</label>
                                <input type="checkbox" value="dining" onChange={handleInputChange} className='common-checkbox' name="" />
                                <label htmlFor="living">Living room</label>
                                <input type="checkbox" value="living" onChange={handleInputChange} className='common-checkbox' name="" />
                            </div>

                            <div className="input-group" id='currency'>
                                <label className="common-label" htmlFor="bathrooms">Prefered Currency</label>
                                <select name="currency" value={selectedCurrency} onChange={handleSelectedChange} className='currency'>
                                    <option value="inr">INR</option>
                                    <option value="usd">USD</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Button */}

                <div>
                    {loading ? (
                        <div className='estimating-btn-container'>
                            <input className='estimating-btn' type="submit" value="ESTIMATING" disabled />
                            <DotsLoader />
                            {/* <div className="dots-loader"></div> */}
                        </div>
                    ) : (
                        <div className='estimate-btn-container'>
                            <input className='estimate-btn' type="submit" value="ESTIMATE" disabled={inputFilled} />
                        </div>
                    )}
                </div>
            </form>

            {restData.length > 0
                && (
                    <section className='estimate-table-section'>
                        <h3>A High Level Estimation:</h3>
                        <table>
                            <thead>
                                <tr>
                                    {restData[0].map((header, i) => (
                                        <th key={i}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {restData.slice(1).map((row, i) => (
                                    <tr key={i}>
                                        {row.map((cell, j) => (
                                            <td key={j}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                        <div className='risks'>
                            <h4>{potentialRisks[0]}</h4>

                            {/* <ol>
     {result.map((row, i) => (
       <li key={i}>{row}</li>
     ))}
   </ol> */}

                            <ul className='risk'>
                                {potentialRisks.slice(1).map((row, i) => (
                                    <li key={i}>{row}</li>
                                ))}
                            </ul>

                        </div>
                    </section>
                )}



        </section>
    )
};

export default Home;