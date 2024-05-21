import { color, motion } from 'framer-motion';
import React from 'react';
const handleRedirect=()=>{
                window.location.href = '/video-summerize-upload';
    };
const Listbox = ({ branding ,content}) => {

  return (
    <motion.div className="box" whileHover={{background:"lightgrey",color:"black"}} >
      <h1>{branding}</h1>
      <p>{content}</p>
      <button onClick={handleRedirect}>GO..</button>
    </motion.div>
  );
};

export default Listbox;
