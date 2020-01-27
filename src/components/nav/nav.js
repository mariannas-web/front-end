import React from 'react'
import Hamburger from './hamburger'
import '../styles/nav/nav.css'


export default class Nav extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
          return(
              <nav>
                  <p className='nav-header'>MW</p>   
                  <div className='desktop-navbar-menu'></div> 
                  <div onClick={this.props.activateMenu}> 
                      <Hamburger  /> 
                  </div> 
              </nav>            
          )
    }
}