import React, { useState, useEffect } from 'react';
import './app.scss';
import Test from './Test';
import Navbar from './components/navbar/Navbar';

function App ()
{
        // const [ data, setData ]=useState( { members: [] } );
        return (
                <div>
                        {/* <section>
                                <Navbar />
                        </section> 
                         <section>Parallax</section>
      <section>Services</section>
      <section>parallax</section>
      <section>Tool1</section>
      <section>Tool2</section>
      <section>Tool3</section>
      <section>Tool4</section>
      <section>Contact</section> */}
                        <span>Result HEre</span>
                        <Test />
                        <Test />
                </div>
        );
}

export default App;
