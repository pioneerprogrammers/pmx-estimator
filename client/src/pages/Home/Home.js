import React, { useState } from 'react'

const Home = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

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
            })
            .catch(error => console.log(error));
    }

    // After Getting Response from API
    const rows = response.split("\n");
    const filtered = rows.filter(word => word !== '');

    const tableData = filtered?.map(row => row.split("\t"));

    return (
        <section>

            <div>
                <h4 className='text-center font-sans text-primary font-bold text-2xl my-3'>High Level Estimation</h4>
            </div>

            <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4 justify-items-center mt-6'>

                <label className="input-field max-w-xs">Just ask anything</label>

                <h4>Question</h4>
                <p>Can you suggest me the detailed estimations in a table of a residence building to construct in Delhi with 4 bedroom, 3 bathroom, living room, kitchen, dining room and porch of 3000 sq feet as stages and activities. then time, resource and cost (INR) for each activity. Don't Mention risks in each activity. Just at the bottom of the table include the potential risks that need to consider.</p>

                <textarea cols={100} rows={5} type="text" className="input-field max-w-xs"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />

                <br />

                <input type="submit" value='submit' className="btn btn-secondary text-white w-full max-w-xs" />
            </form>

            {tableData.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            {tableData[0].map((header, i) => (
                                <th key={i}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.slice(1).map((row, i) => (
                            <tr key={i}>
                                {row.map((cell, j) => (
                                    <td key={j}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </section>
    )
};

export default Home