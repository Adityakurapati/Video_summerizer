import { motion } from 'framer-motion';
import './cursor.scss';
import { useEffect, useState } from 'react';

const Cursor = () => {
        const [position,setPosition] = useState({x:0,y:0});
        useEffect(()=>{
                const mousemove = e =>{
                        setPosition({x:e.clientX,y:e.clientY});
                }
                window.addEventListener('mousemove',mousemove);
                return ()=>{window.removeEventListener('mousemove',mousemove);};
        },[position]);
        console.log(position);

  return (
    <motion.div className='cursor' animate={{x:position.x,y:position.y}}>
        
    </motion.div>
  )
}

export default Cursor
