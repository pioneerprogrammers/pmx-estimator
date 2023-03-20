import React, { useEffect, useState } from 'react';
import LoaderBtn from '../../shared/LoaderBtn/LoaderBtn';
import SubmitBtn from '../../shared/SubmitBtn/SubmitBtn';
import './Form.css';

const Form = ({ setResponse }) => {
    // prompt state
    const [prompt, setPrompt] = useState("");
    // form input states
    const [selectedBuildingType, setSelectedBuildingType] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("inr");
    const [checkedValues, setCheckedValues] = useState([]);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [sqft, setSqft] = useState('');

    const [loading, setLoading] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(true);

    // input handler
    const handleCountry = (e) => {
        setCountry(e.target.value);
        setDisabledBtn(false);
    }
    const handleCity = (e) => {
        setCity(e.target.value);
        setDisabledBtn(false);
    }
    const handleSqft = (e) => {
        setSqft(e.target.value);
        setDisabledBtn(false);
    }

    // selected options handler
    const handleSelectedChange = event => {
        setDisabledBtn(false);
        const { name, value } = event.target;
        if (name === "residential") {
            setSelectedBuildingType(value);
        }
        else if (name === "currency") {
            setSelectedCurrency(value);
        }
    };

    // checkmarked input value change handler
    const handleInputChange = event => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setCheckedValues([...checkedValues, value]);
        }
        else {
            setCheckedValues(checkedValues.filter(item => item !== value));
        }
    };

    // form submit handler
    const handleSubmit = event => {
        event.preventDefault();
        const userData = {
            residential: selectedBuildingType,
            country: country,
            city: city,
            sqft: sqft,
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
            setDisabledBtn(true);
            const { residential, country, city, sqft, bedroom, bathroom, kitchen, dining, living, porch, currency } = userData;
            // create query by using user data
            const query = `Can you suggest me the detailed estimations in a table of a ${residential} building with to construct in ${city}, ${country} with ${bedroom} bedroom, ${bathroom} bathroom${living ? ', living room' : ''}${kitchen ? ', kitchen' : ''}${dining ? ', dining room' : ''}${porch ? ', porch' : ''} of ${sqft} sq feet as stages and activities. then along with the total, display time, number of laborers (mention site engineer number, workers number for stages) and cost (${currency}) for each activity. Don't Mention risks in each activity. Just at the bottom of the table include the potential risks that need to consider.`

            setPrompt(query);
            setLoading(true);
        }
    }

    // fetch data from api and get response
    useEffect(() => {
        if (prompt === '') {
            return;
        }
        else {
            fetch('https://client-sepia-ten.vercel.app/chat', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            })
                .then(res => res.json())
                .then(data => {
                    setResponse(data.response);
                    setLoading(false);
                })
                .catch(error => console.log(error));
        }
    }, [prompt, setResponse]);

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div className="form-flex-container">
                    <div className="form-flex-item">
                        <div>
                            <select name="residential" value={selectedBuildingType} onChange={handleSelectedChange} className='residential'>
                                <option value="">Building Type</option>
                                <option value="residential">Residential</option>
                                <option value="commercial">Commercial</option>
                            </select>
                            <label className='common-label' htmlFor="country">Country</label>
                            <input onChange={handleCountry} type="text" />
                            <label className='common-label' htmlFor="city">City</label>
                            <input onChange={handleCity} type="text" />
                            <label className='common-label' htmlFor="sqft">Total Sqaure feet</label>
                            <input onChange={handleSqft} type="text" />
                        </div>
                    </div>
                    <div className="form-flex-item">
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
                <div>
                    {loading ? (
                        <LoaderBtn />
                    ) : (
                        <SubmitBtn disabledBtn={disabledBtn} />
                    )}
                </div>
            </form>
        </section>
    )
}

export default Form;