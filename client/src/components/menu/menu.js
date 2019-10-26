import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/menu/menu.css'


export default class Menu extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            clicked: false
        }
    }

    clickHandler = () => {
        document.querySelector('.menu').classList.toggle('hide')
    }


    logoutHandler = () => {
        localStorage.clear()
        sessionStorage.removeItem('token')
        console.log(localStorage)
    }


    render(){
        return(
            <div onClick={this.clickHandler} className='menu hide'>
              <Link style={{textDecoration: "none", color: 'white'}} to='/'><h3>Currents</h3></Link>
              <Link style={{textDecoration: "none", color: 'white'}} to='undergroundFeed'><h3>Underground Feed</h3></Link>
              <Link style={{textDecoration: "none", color: 'white'}} to='politicalFeed'><h3>Political Feed</h3></Link> 
              <h3>My Web</h3>
              <h3>The Rabbit Hole</h3>
              <h3>Contact</h3>
              <Link style={{textDecoration: "none", color: 'white'}} to='postNews'><h3 className={localStorage.getItem('username') !== `${process.env.REACT_APP_ADMIN_KEY}` ? 'hidden' : 'flex'}>Post News</h3></Link>
              <Link style={{textDecoration: "none", color: 'white'}} to='register'><h3>Sign Up/Log in</h3></Link>
              <Link style={{textDecoration: "none", color: 'white'}} to='login'><h3 onClick={this.logoutHandler}>Log out</h3></Link>
            </div> 
        )
    }
}