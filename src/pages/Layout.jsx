import React, { useState } from 'react';
import Brainstorm from './Brainstorm';
import Contact from './Contact';
import Slideshow from './Slideshow';

const Layout = () => {
    const [activeComponent, setActiveComponent] = useState('first');

    // TO DO: Refactor to use a mapping of some sort over indices rather than hard coding stuff about..
    const showFirstComponent = () => {
      setActiveComponent('first');
    };

    const showSecondComponent = () => {
      setActiveComponent('second');
    };

    const showThirdComponent = () => {
      setActiveComponent('third');
    };

    return (
      <div>
        <div className="mt-5 flex justify-center">
          <button
            onClick={showFirstComponent}
            className={`mr-2 py-2 w-1/5 rounded ${activeComponent === 'first' ? 'bg-orange-500 text-white' : 'bg-gray-300'}`}
          >
            Message
          </button>
          <button
            onClick={showSecondComponent}
            className={`mr-2 py-2 w-1/5 rounded ${activeComponent === 'second' ? 'bg-orange-500 text-white' : 'bg-gray-300'}`}
          >
            Contact Us
          </button>
          <button
            onClick={showThirdComponent}
            className={`py-2 w-1/5 rounded ${activeComponent === 'third' ? 'bg-orange-500 text-white' : 'bg-gray-300'}`}
          >
            Generate Slideshows (BETA)
          </button>
        </div>
        <div className="">
          {activeComponent === 'first' && <Brainstorm />}
          {activeComponent === 'second' && <Contact />}
          {activeComponent === 'third' && <Slideshow />}
        </div>
      </div>
    );
}

export default Layout;