import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0.5,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 4,
      staggerChildren: 1.2,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const BlurBox = ({ color, blur, x, y, width, height }) => {
  const styles = {
    background: color,
    filter: `blur(${blur}px)`, 
    width: width,
    height: height,
    position: "absolute",
    left: x, 
    top: y,
    borderRadius:"50%"
  };

  return <motion.div className="blur" variants={variants} initial="initial" animate="animate" style={styles}></motion.div>;
};

export default BlurBox;
