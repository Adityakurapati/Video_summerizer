import { motion } from 'framer-motion';
import {useState} from 'react'
const Test =()=>{      
        const [open,setOpen] = useState(false);
        const variants ={
                visible:{opacity:1,x:300,transition:{type:"spring",stiffess:2000}},
                hidden:{opacity:0}
        } ;
        return(
                <div className='course'>
                <motion.div
  className="box"
  initial="hidden"
  variants={variants}
  transition={{ duration: 2 }}
  animate={open? "visible":"hidden"}
//   animate="visible"
//   initial={{opacity:0.5,scale:0}}
//   whileHover={{opacity:1,scale:2}}
//   whileInView={{opacity:1,scale:2}}
//   whileTap={{opacity:1,scale:2}}
  drag
></motion.div>   
<button onClick={()=>setOpen(prev=>!prev)}>Click</button>                     
                </div>
        )
}
export default Test;

// const Test =()=>{
//         return(
//                 <div></div>
//         )
// }
// export default Test;
