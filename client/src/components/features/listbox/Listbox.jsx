import { color, motion } from 'framer-motion';
import React from 'react';

const Listbox = ({ branding }) => {
        let content ="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ab perspiciatis repudiandae nesciunt iusto tempore aliquid iure dolores nihil, possimus, culpa pariatur facilis.";

  return (
    <motion.div className="box" whileHover={{background:"lightgrey",color:"black"}}>
      <h1>{branding}</h1>
      <p>{content}</p>
      <button>GO..</button>
    </motion.div>
  );
};

export default Listbox;
