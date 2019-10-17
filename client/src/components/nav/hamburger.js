import React from 'react'
import '../styles/nav/hamburger.css'

export default class Hamburger extends React.Component{

    render(){
        return(
            <div className='hamburger-container'> 
              <div className="bar bar1"></div> 
              <div className="bar bar2"></div>
              <div className="bar bar3"></div> 
            </div>  
        )
    }
}