import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { FiCopy } from 'react-icons/fi';
import './processedVideo.scss'
const ProcessedVideo = () => {
    const [result, setResult] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const resultParam = urlParams.get('result');
        if (resultParam) {
            setResult(resultParam);
        }
    }, []);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(result);
    };

    return (
        <div>
            {result ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>Processed Video</h1>
                    <p>{result}</p>
                    <button onClick={handleCopyToClipboard}>
                        {/* <FiCopy /> */}
                        Copy Result Text
                    </button>
                </motion.div>
            ) : (
                <p>No video file specified.</p>
            )}
        </div>
    );
};

export default ProcessedVideo;
