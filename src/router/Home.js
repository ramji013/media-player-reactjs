import React from 'react';
import {Link} from 'react-router-dom'

export default function Home(){

    const navStyle = {
        color: 'white'
    }

    return (
        <nav className="nav-tag">
            <ul className="nav-links">
                <li><Link style={navStyle} to="/">Home</Link></li>
                <li><Link style= {navStyle} to="/addVideo">Add Video</Link></li>
                <li><Link style= {navStyle} to="/control">Control</Link></li>
            </ul>
        </nav>
    );
}