import React, { useState, useEffect } from 'react';
import './app.scss';
import Test from './Test';
import Navbar from './components/navbar/Navbar';

function App ()
{
        const [ data, setData ]=useState( { members: [] } );

        /*
        useEffect( () =>
        {
                fetch( '/members' )
                        .then( ( res ) => res.json() )
                        .then( ( data ) =>
                        {
                                setData( data );
                        } );
        }, [] ); // Make sure to add an empty dependency array to useEffect
        */

        return (
                <div>
                        {/* <section>
                                <Navbar />
                        </section> */}
                        {/* <section>Parallax</section>
      <section>Services</section>
      <section>parallax</section>
      <section>Tool1</section>
      <section>Tool2</section>
      <section>Tool3</section>
      <section>Tool4</section>
      <section>Contact</section> */}
                        <span>Result HEre</span>
                        <Test />
                        {/* <div>
                                { data.members===undefined? (
                                        <div>Loading....</div>
                                ):(
                                        data.members.map( ( member, index ) => (
                                                <span key={ index }>{ member }</span>
                                        ) )
                                ) }
                        </div> */}
                </div>
        );
}

export default App;
