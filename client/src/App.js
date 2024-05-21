import React, { useState, useEffect } from 'react';
import './app.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Parallax from './components/parallax/Parallax';
import Features from './components/features/Features';
import Testinomials from './components/testinomials/Testinomials';
import Contact from './components/contact/Contact';
import Cursor from './components/cursor/Cursor';
import VideoSummerizer from './components/video-summerizer/VideoSummerizer';
import YtSummerizer from './components/video-summerizer/YtSummerizer';
import Chatbot from './components/video-summerizer/Chatbot';
import Login from './components/login/Login';
import FloatingMenu from './components/menu/FloatingMenu';

function App ()
{
        const [ user, setUser ]=useState( null );
        const location=useLocation();

        useEffect( () =>
        {
                const params=new URLSearchParams( location.search );
                const userData=params.get( 'user' );
                if ( userData )
                {
                        setUser( JSON.parse( userData ) );
                }
        }, [ location.search ] );

        const handleViewSummerizations=() =>
        {
                // Logic to view summerizations
        };

        const handleToggleDarkMode=() =>
        {
                // Logic to toggle dark mode
        };

        return (
                <div>
                        <Routes>
                                <Route path="/video-summerize-upload" element={ <VideoSummerizer /> } />
                                <Route path="/yt-summerize-process" element={ <YtSummerizer /> } />
                                <Route path="/chatbot" element={ <Chatbot /> } />
                                <Route path="/login" element={ <Login setUser={ setUser } /> } />
                                <Route path="/" element={
                                        <div>
                                                <section id="HomePage">
                                                        <Navbar />
                                                        <Hero />
                                                </section>

                                                <section id="Services">
                                                        <Parallax type='services' />
                                                </section>
                                                <section id="Features">
                                                        <Features />
                                                </section>
                                                <section id="">
                                                        <Parallax type='testinomials' />
                                                </section>
                                                <Testinomials />
                                                <section id="">
                                                        <Contact />
                                                </section>
                                        </div>
                                } />
                        </Routes>
                        { user&&<FloatingMenu userName={ user.name } onViewSummerizations={ handleViewSummerizations } onToggleDarkMode={ handleToggleDarkMode } /> }
                        <Cursor />
                </div>
        );
}

export default App;
