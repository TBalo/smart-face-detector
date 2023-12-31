import React from 'react';
import 'tachyons';
import { Tilt } from 'react-tilt'
import './Logo.css'
import brain from './brain.png'

const defaultOptions = {
	max: 25,     // max tilt rotation (degrees)
}

const Logo = () => {
    return (
      <div className="ma4 mt0">
        <Tilt className="Tilt br2 shadow-2" options={defaultOptions} style={{ height: 150, width: 150 }}>
            <div className="Tilt-inner pa3">
                <img style={{paddingTop:'5px'}} alt='logo' src={brain}/>
            </div>
        </Tilt>
      </div>
    );
}

export default Logo;