import react from 'react';
import './navbar.scss';
import {motion} from 'framer-motion';
import Sidebar from '../sidebar/Sidebar'
const Navbar=()=>{
        return (
                <div className='navbar'>
                        <Sidebar />
                        <div className='wrapper'>
                                <motion.span 
                                initial={{ opacity:0.5,scale:0.5,x:-100 }}
                                animate={{opacity:1,scale:1,x:1}}
                                transition={{duration:0.5}}
                                >
                                        QuickGlance
                                </motion.span>
                                <div className="links">
                                        <a href='#home'>Home</a>
                                        <a href='#about'>About</a>
                                        <a href='#services'>Service</a>
                                        <a href='#contact'>Contact</a>
                                </div>
                        </div>
                </div>
        )
}
export default Navbar;