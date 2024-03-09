import { motion, useInView } from 'framer-motion'
import './features.scss'
import Listbox from './listbox/Listbox'
import { useRef } from 'react'
// import '../blurbox/Blurbox'
const variants={
        initial:{
                x:"-500",
                y:100
        },
        animate:{
                x:0,
                y:0,
                transition:{
                        duration:2,
                        staggerchildren:0.1
                }
        }
}
const Features = () => {

        const ref = useRef();
        const inView = useInView(ref,{margin:"-100px"});
  return (
//     <motion.div className='features' variants={variants} initial="initial" whileInView="animate">
        
    <motion.div className='features' variants={variants} initial="initial" animate={inView && "animate"}>
        {/* <BlurBox color="blue" x="0" y="0" blur={2} width="40px" height="40px"/> */}
        <motion.div className="textContainer" variants={variants}>
                <p>Let's Gooo To <br/> Summerrrize ...</p>
                <hr />
        </motion.div>
        <motion.div className="titleContainer" variants={variants}>
                {/* <motion.img src="/images/main-4.png" /> */}
                <motion.h1>Explore Our <motion.b whileHover={{color:"orange"}}>Features</motion.b></motion.h1>
        </motion.div>
        <motion.div className="listContainer" variants={variants}>
                <Listbox branding="Youtube"/>
                <Listbox branding="Custom Video"/>
                <Listbox branding="TEXT Summerizer"/>
                <Listbox branding="ChatBot"/>
        </motion.div>
    </motion.div>
  )
}

export default Features
