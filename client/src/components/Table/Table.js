import React from 'react';
import './Table.css';

const Table = ({ response }) => {
    // After Getting Response from API
    const rows = response.split("\n");
    const filtered = rows.filter(word => word !== '');
    const tableData = filtered?.map(row => row.split("\t"));

    // Separating the Potential Risk from table data
    const potentialRisksIndex = tableData.findIndex(data => data[0] === 'Potential Risks:');
    const restData = potentialRisksIndex !== -1 ? tableData.slice(0, potentialRisksIndex) : tableData;
    const potentialRisks = tableData?.slice(potentialRisksIndex);

    return (
        <>
            {
                restData.length > 0
                && (
                    <section className='estimate-table-section'>
                        <h3>A High Level Estimation:</h3>
                        <div className='table-container'>
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
                        </div>
                        <div className='risks'>
                            <h4>{potentialRisks[0]}</h4>
                            <ul className='risk'>
                                {potentialRisks.slice(1).map((row, i) => (
                                    <li key={i}>{row}</li>
                                ))}
                            </ul>

                        </div>
                    </section>
                )
            }
        </>
    )
}

export default Table;