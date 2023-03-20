import React, { useState } from 'react';
import siteLogo from '../../assets/images/logo/site-logo.png';
import Form from '../../components/Form/Form';
import Table from '../../components/Table/Table';
import './Home.css';

const Home = () => {
    const [response, setResponse] = useState("");

    return (
        <main className='main'>
            <img className='site-logo' src={siteLogo} alt="" />
            <p>Get an accurate estimate of your construction project costs with our AI-powered estimator. Enter your project details below and let our advanced algorithms do the work for you. It's quick, easy, and hassle-free!</p>
            <Form setResponse={setResponse} />
            <Table response={response} />
        </main>
    )
};

export default Home;