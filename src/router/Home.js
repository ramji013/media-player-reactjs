import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

export default function Home(){
    return (
        <nav className="nav-tag">
            <ul className="nav-links">
                <li>Home</li>
                <li>Add Video</li>
                <li>Admin</li>
            </ul>
        </nav>
    );
}