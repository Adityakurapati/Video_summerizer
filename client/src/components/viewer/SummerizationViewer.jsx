import React, { useEffect, useState } from 'react';
import DisplaySummerization from './DisplaySummerization';
import './viewer.scss';
import { ThreeDots } from 'react-loader-spinner'; // Correct import for ThreeDots

import '../video-summerizer/videosummerize.scss';
const SummerizationViewer = ({ username }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!username) return;
            try {
                const response = await fetch(`http://localhost:5000/view-summerizations?user=${username}`);
                const data = await response.json();
                setResults(data.summarizations);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false when data fetching is complete
            }
        };

        fetchData();
    }, [username]);

    return (
        <div>
            {loading ? (
                <div className="loader-container">
                <ThreeDots color="#007bff" height={100} width={100} />
            </div>
            ) : results.length > 0 ? (
                <DisplaySummerization list={results} />
            ) : (
                <p>No summarizations available.</p>
            )}
        </div>
    );
};

export default SummerizationViewer;
