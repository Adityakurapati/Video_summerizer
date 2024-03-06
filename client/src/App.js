import React from 'react';
import './app.scss';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Parallax from './components/parallax/Parallax';
import Features from './components/features/Features';
import Testinomials from './components/testinomials/Testinomials';


function App ()
{
        return (
                <div>
                        <section id="HomePage">
                                <Navbar />
                                <Hero />
                        </section>

                        <section id="Parallax-1"><Parallax type='services' /></section>
                        <section id="Features">
                                <Features />
                        </section>
                        <section id=""><Parallax type='testinomials' /></section>
                        <Testinomials />
                        <section id="">Contact</section>

                </div>
        );
}

export default App;
