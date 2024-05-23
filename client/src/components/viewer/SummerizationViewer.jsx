import React, { useEffect, useState } from 'react';
import DisplaySummerization from './DisplaySummerization';
import './viewer.scss'

const SummerizationViewer = ({ username }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!username) return;
            try {
                const response = await fetch(`http://localhost:5000/view-summerizations?user=${username}`);
                const data = await response.json();
                setResults(data.summarizations);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [username]);

    return (
        <div>
            {results.length > 0 ? (
                <DisplaySummerization list={results} />
            ) : (
                <p>No summarizations available.</p>
            )}
        </div>
    );
};

export default SummerizationViewer;
