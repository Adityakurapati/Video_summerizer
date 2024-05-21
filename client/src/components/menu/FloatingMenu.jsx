import React from 'react';
import './floatingmenu.scss';
const FloatingMenu = ({ userName, onViewSummerizations, onToggleDarkMode }) => {
    return (
        <div className="floating-menu">
            <div style={{color:"black"}} className="user-info">Ola ,{userName}</div>
            <button onClick={onViewSummerizations}>View Summerizations</button>
            <button onClick={onToggleDarkMode}>Toggle Dark Mode</button>
        </div>
    );  
};

export default FloatingMenu;
