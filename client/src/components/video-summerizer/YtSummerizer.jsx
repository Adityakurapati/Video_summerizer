import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import './videosummerize.scss';
import './ytsummerize.scss';

const YtSummerizer = () => {
    const [textInput, setTextInput] = useState('');

    const handleTextChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleVideoProcessing = async (event) => {
        event.preventDefault(); // Prevent form submission
        
        // Process the text input here
        console.log('Text input:', textInput);
    };

    return (
        <motion.div className="summerizer-upload-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <nav>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><h1>Quick Glance</h1></motion.li>
            </nav>
            <motion.div className="container" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <form onSubmit={handleVideoProcessing}>
                    <div className="upload-video-icons" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <div className="text-input-container">
                            <input 
                                type="text" 
                                value={textInput} 
                                onChange={handleTextChange} 
                                placeholder="Paste Your Youtube Like Here " 
                            />
                            <motion.button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} className="arrow-icon" />
                            </motion.button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default YtSummerizer;
