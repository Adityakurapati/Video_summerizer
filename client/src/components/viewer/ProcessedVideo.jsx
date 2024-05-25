import React, { useState, useEffect } from 'react';

const ProcessedVideo = () => {
    const [result, setResult] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const resultParam = urlParams.get('result');
        if (resultParam) {
            setResult(resultParam);
        }
    }, []);

    return (
        <div>
            {result ? (
                <div>
                    <h1>Processed Video</h1>
                    <p>{result}</p>
                </div>
            ) : (
                <p>No video file specified.</p>
            )}
        </div>
    );
};

export default ProcessedVideo;
