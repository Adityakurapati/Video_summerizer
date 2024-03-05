import React, { useState, useEffect } from 'react';
import './app.scss';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';

function App ()
{
        return (
                <div>
                        <section id="HomePage">
                                <Navbar />
                                <Hero />
                        </section>

                        <section id="">Parallax</section>
                        <section id="">Services</section>
                        <section id="">parallax</section>
                        <section>Tool1</section>
                        <section>Tool2</section>
                        <section>Tool3</section>
                        <section>Tool4</section>
                        <section id="">Contact</section>

                </div>
        );
}

export default App;
