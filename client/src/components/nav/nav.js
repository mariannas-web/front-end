import React from 'react'
import Hamburger from './hamburger'
import {Link} from 'react-router-dom'
import '../styles/nav/nav.css'



export default class Nav extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
      return(
        <nav>
          <p className='nav-header'>MW</p>   
          <div className='desktop-navbar-menu'>
              <h1>Mariannas Web</h1>
             
            </div> 
          <div onClick={this.props.activateMenu}> 
            <Hamburger  /> 
          </div> 
        </nav>            
      )
    }
}