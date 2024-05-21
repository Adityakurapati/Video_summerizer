import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import './videosummerize.scss';

const VideoSummerizer = () => {
    const [uploadedVideo, setUploadedVideo] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setUploadedVideo(file);
    };

    const handleVideoProcessing = async (event) => {
        event.preventDefault(); // Prevent form submission
        if (uploadedVideo) {
            const formData = new FormData();
            formData.append('video', uploadedVideo);
            
            try {
                const response = await fetch('http://localhost:5000/uploadVideo', {
                    method: 'POST',
                    body: formData,
                    mode: 'cors' // Allow CORS
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    const result = await response.json();
                    console.log(result.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log("No video uploaded");
        }
    };

    return (
        <motion.div className="summerizer-upload-container" whileHover={{ scale: 1.1 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <nav>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><h1>Quick Glance</h1></motion.li>
            </nav>
            <motion.div className="container" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <form onSubmit={handleVideoProcessing}>
                    <div className="upload-video-icons" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <label htmlFor="upload-video" className="upload-label">
                            <input type="file" id="upload-video" accept="video/*" onChange={handleFileUpload} />
                            <motion.div whileHover={{ scale: 1.1 }} className="cover">
                                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                            </motion.div>
                        </label>
                        <motion.button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Process Video</motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default VideoSummerizer;
