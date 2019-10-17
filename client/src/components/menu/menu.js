import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/menu/menu.css'


export default class Menu extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className='menu hide'>
              <h3>Currents</h3> 
              <h3>My Feed</h3>
              <h3>Popular Feeds</h3>
              <h3>Genres</h3>
              <h3>Settings</h3>
              <h3>Chat</h3>
              <Link to='register'><h3>Sign Up/Log in</h3></Link>
              <h3>Contact</h3>
              <Link to='postNews'><h3>Post News</h3></Link>
            </div> 
        )
    }
}