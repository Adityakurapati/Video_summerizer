import React from 'react';
import './viewer.scss';

const DisplaySummerization = ({ list }) => {
    return (
        <div className="summary-container">
            {list.map((item, index) => (
                <div key={index} className="summary-item">
                    <div className="summary-text">Summarization Text: {item.text}</div>
                    <div className="summary-link">
                        Video Link: <a href={item.video_link} target="_blank" rel="noopener noreferrer">{item.video_link}</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplaySummerization;
