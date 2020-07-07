import React from 'react';
import './layout.css';
import Uploader from './Uploader/uploader';

function Layout (){
    return (
        <div className = "basic"> 
            <div className = "left"> Left Navigation </div>
            <Uploader />
            <div className= "right"> Right section </div>
        
        </div>
    )
}

export default Layout;