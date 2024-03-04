import react from 'react';
import './navbar.scss'
const Navbar=()=>{
        return (
                <div className='navbar'>
                        <div className='wrapper'>
                                <span>
                                        QuickGlance
                                </span>
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