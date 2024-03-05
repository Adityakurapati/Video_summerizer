import React from 'react';
import './hero.scss';
import { motion } from 'framer-motion';

const sliderVariants={
        initial:{
                x:0
        },animate:{
                x:"-220%",
                transition:{
                        duration:20,
                        repeat:Infinity,
                        repeatType:"mirror"
                }
        }
}
const textVariants={
        initial:{
                x:-500,
                opacity:0
        }
        ,animate:{
                x:0,
                opacity:1
                ,transition:{
                        duration:1,
                        staggerChildren:0.1
                }
        },
        scrollButton:{
                opacity:0,
                y:10,
                transition:{
                        duration:2,
                        repeat:Infinity
                }
        }
}
const Hero = () => {
  return (
    <div className='hero'>
        <div className="wrapper">

                <motion.div className="textContainer" variants={textVariants} initial="initial" animate="animate" >
                        <motion.h3 variants={textVariants} >QuickGlance </motion.h3>
                        <motion.h1 variants={textVariants} >Your Rapid Recap Bot </motion.h1>
                        <motion.div className="buttons" variants={textVariants} >
                                <motion.button variants={textVariants} >Samples</motion.button>
                                <motion.button variants={textVariants} >Our Tools</motion.button>
                        </motion.div>
                        <motion.img src="/scroll.png" alt=""  variants={textVariants} />
                </motion.div>
                <motion.div className="slidingTextContainer" variants={sliderVariants} initial="initial" animate="animate">
                        Quick Glance
                </motion.div>
                <motion.div className="imageContainer" variants={textVariants} >
                        <img src="/material.png" alt="" />
                </motion.div>

              
      </div>
    </div>
  )
}

export default Hero;