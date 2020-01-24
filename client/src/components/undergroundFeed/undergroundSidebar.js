import React from 'react' 
import axios from 'axios'
import '../styles/landing/landingSidebar.css'

export default class UndergroundSidebar extends React.Component{
    constructor(props){
        super(props)
     
    }

    render(){
        while(!this.props){return <div style={{color: 'white'}}>HEYHEY</div>}
        return(
            <div className='sidebar-container'>
                <h3 style={{color: 'white'}}>{this.props.sideData.title}</h3>
                <div className='author-published-container'>
                    <p>{this.props.sideData.source}</p> 
                    <p>{this.props.sideData.date}</p>                        
                </div> 
                <hr/>   
            </div>  
        )
    }
}