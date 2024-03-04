import { motion } from 'framer-motion';
import {useState} from 'react'
const Test =()=>{      
        const [open,setOpen] = useState(false);
        const variants ={
                visible:(i)=>({opacity:1,
                        x:300,
                        transition:{StaggerChildren:0.2}}),
                hidden:{opacity:0}
        } ;
        const items=['items','items2','items3','items4']
        return(
                <div className='course'>
                <motion.ul initial="hidden" variants={{variants}} animate="visible">
                        {items.map((item)=>(
                        <motion.li variants={variants} key={item} animate="visible">{item}  custom={index}</motion.li>
                        ))}
                </motion.ul>                
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
