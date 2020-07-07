import React from 'react'
import './uploader.css'
import Dropfiles from './dropfiles';

export default function Uploader() {
    return (
        <div className="top-section" >
            <div className="content"> Upload new file </div>
            <div className="description">Drop any file in the uploader below or 
                                      attach by clicking anywhere inside</div>
            <Dropfiles />
        </div>
    )
}