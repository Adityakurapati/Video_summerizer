import { motion } from 'framer-motion';
import './links.scss';

const variants = {
        opened:{
                transition:{
                        staggerChildren:0.1
                }
        },
        closed:{
                transition:{
                        staggerChildren:0.05,
                        staggerDirection:-1
                        // oposite direction
                }
        }
}
const itemVariants = {
        opened:{
                y:0,
                opacity:1
        },
        closed:{
                y:50,
                opacity:0
        }
}

const Links=()=>{
        const items=[
                "HomePage",
                "Services",
                "About",
                "Contact"
        ];
        return (
                <motion.div className='links' variants={variants}>
                        {items.map((item)=>
                                (<motion.a href={`#${item}`} variants={itemVariants} whileHover={{scale:1.1}}>
                                        {item}
                                </motion.a>)
                        )}
                </motion.div>
        )
}
export default Links;