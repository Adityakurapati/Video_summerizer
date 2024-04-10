import React from 'react';
import './app.scss';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Parallax from './components/parallax/Parallax';
import Features from './components/features/Features';
import Testinomials from './components/testinomials/Testinomials';
import Contact from './components/contact/Contact';
import Cursor from './components/cursor/Cursor';
import VideoSummerizer from './components/video-summerizer/VideoSummerizer';
function App ()
{
        return (
                <div>
                        <section id="video-summerize-upload">
                                <Navbar />
                                <VideoSummerizer />
                        </section>
                        <Cursor />
                        <section id="HomePage">
                                <Navbar />
                                <Hero />
                        </section>

                        <section id="Services"><Parallax type='services' /></section>
                        <section id="Features">
                                <Features />
                        </section>
                        <section id=""><Parallax type='testinomials' /></section>

                        <Testinomials />
                        <section id="">
                                <Contact />
                        </section>
                </div>
        );
}

export default App;
