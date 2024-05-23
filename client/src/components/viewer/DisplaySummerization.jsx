import React from 'react';
import './viewer.scss'
const DisplaySummerization = ({ list }) => {
    return (
        <div>
            {list.map((item, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <div>Summarization Text: {item.text}</div>
                    <div>
                        Video Link: <a href={item.video_link} target="_blank" rel="noopener noreferrer">{item.video_link}</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplaySummerization;
