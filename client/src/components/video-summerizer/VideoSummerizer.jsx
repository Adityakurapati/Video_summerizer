import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './videosummerize.scss';

const VideoSummerizer = () => {
    const [uploadedVideo, setUploadedVideo] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setUploadedVideo(file);
    };

    const handleVideoProcessing = () => {
        if (uploadedVideo) {
            const formData = new FormData();
            formData.append('video', uploadedVideo);
            
            fetch('/upload-video', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Handle response
            })
            .catch(error => {
                console.error('Error uploading video:', error);
            });
        } else {
            // No video uploaded, handle accordingly
        }
    };

    return (
        <motion.div className="summerizer-upload-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <nav>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><h1>Quick Glance</h1></motion.li>
            </nav>
            <motion.div className="container" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <motion.div className="upload-video-icons" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <input type="file" accept="video/*" onChange={handleFileUpload} />
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleVideoProcessing}>Process Video</motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default VideoSummerizer;
