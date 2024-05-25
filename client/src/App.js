import React, { useState, useEffect } from 'react';
import './app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Callback from './components/callback/Callback';
import Register from './components/register/Register';
import SummerizationViewer from './components/viewer/SummerizationViewer';
import ProcessedVideo from './components/viewer/ProcessedVideo';

function App ()
{
        const [ user, setUser ]=useState( null );

        useEffect( () =>
        {
                const storedUser=localStorage.getItem( 'user' );
                if ( storedUser )
                {
                        setUser( JSON.parse( storedUser ) );
                }
        }, [] );

        const handleViewSummerizations=() =>
        {
                // Logic to view summerizations
        };

        const handleToggleDarkMode=() =>
        {
                // Logic to toggle dark mode
        };

        return (
                <Router>
                        <div>
                                <Routes>
                                        <Route path="/upload-video" element={ <VideoSummerizer /> } />
                                        <Route path="/view-summerizations" element={ <SummerizationViewer username={ user?.name } /> } />
                                        <Route path="/processedVideo" element={ <ProcessedVideo /> } />
                                        <Route path="/yt-summerize" element={ <YtSummerizer /> } />
                                        <Route path="/chatbot" element={ <Chatbot /> } />
                                        <Route path="/login" element={ <Login setUser={ setUser } /> } />
                                        <Route path="/register" element={ <Register setUser={ setUser } /> } />
                                        <Route path="/callback" element={ <Callback /> } />
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
                </Router>
        );
}

export default App;
