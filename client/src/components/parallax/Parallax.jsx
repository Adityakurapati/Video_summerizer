import { motion, useScroll, useTransform } from 'framer-motion';
import './parallax.scss';
import { useRef } from 'react';

const Parallax = ({ type }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // [start, end]
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="parallax"
      style={{
        background: type === "services" ? "linear-gradient(180deg, #111132, #0c0c1d)" : "linear-gradient(180deg, #111132, #505064)",
      }}
      ref={ref}
    >
      <motion.h1 style={{ y: yText }}>{type === "services" ? "Explore Our Services " : "How Is Our Performance"}</motion.h1>
      <motion.div className="mountains"></motion.div>
      <motion.div
        className="planets"
        style={{
          y: yText,
          backgroundImage: `url(${type === "services" ? "/images/planets.png" : "/images/rocket.jpg"})`,
        }}
      ></motion.div>
      <motion.div style={{ x: yBg }} className="stars"></motion.div>
    </div>
  );
};

export default Parallax;
