import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import Listbox from './listbox/Listbox';
import './features.scss';

const Features = () => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start("animate");
    }, [controls]);

    const variants = {
        initial: {
            opacity: 0,
            y: 50
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div className='features' initial="initial" animate={controls}>
            <motion.div className="textContainer" variants={variants}>
                <p>Let's Dive into <br /> Summarization...</p>
                <hr />
            </motion.div>
            <motion.div className="titleContainer" variants={variants}>
                <h1>Explore Our <b>Features</b></h1>
            </motion.div>
            <motion.div className="listContainer" variants={variants}>
                <Listbox branding="YouTube" content="Extract insights from YouTube videos." />
                <Listbox branding="Custom Video" content="Summarize your own videos effortlessly." />
                <Listbox branding="Text Summarizer" content="Condense long texts into concise summaries." />
                <Listbox branding="ChatBot" content="Engage with our AI-powered chatbot for assistance." />
            </motion.div>
        </motion.div>
    );
};

export default Features;
