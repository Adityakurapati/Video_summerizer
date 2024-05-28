import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import './ytsummerize.scss';

const YtSummerizer = () => {
    const [textInput, setTextInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTextChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleVideoProcessing = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/processVideo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ youtube_url: textInput }),
            });

            const result = await response.json();
            console.log('Video processing result:', result);

            if (response.ok) {
                // Handle success (e.g., display summarization results)
            } else {
                // Handle error (e.g., display error message)
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error processing video:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div className="summerizer-upload-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <nav>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><h1>Quick Glance</h1></motion.li>
            </nav>
            <motion.div className="container" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <form onSubmit={handleVideoProcessing}>
                    <motion.div className="upload-video-icons" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <div className="text-input-container">
                            <motion.input 
                                type="text" 
                                value={textInput} 
                                onChange={handleTextChange} 
                                placeholder="Paste Your Youtube Link Here" 
                                initial={{ x: -200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.button 
                                type="submit" 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.9 }} 
                                disabled={isSubmitting}
                                className={isSubmitting ? 'loading' : ''}
                            >
                                {isSubmitting ? (
                                    <motion.div 
                                        className="spinner"
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                    />
                                ) : (
                                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="arrow-icon" />
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default YtSummerizer;
