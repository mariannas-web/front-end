import React from 'react' 
import '../styles/landing/landingSidebar.css'

export default class MyWebSidebar extends React.Component{
    constructor(props){
        super(props)    
    }

    render(){
        while(!this.props){return <div style={{color: 'white'}}>Loading Content...</div>}
        return(
            <div className='sidebar-container'>
                <h3 style={{color: 'white'}}>{this.props.sideData.title}</h3>
                <div className='author-published-container'>
                    <p>{this.props.sideData['user.username']}</p> 
                    <p>{this.props.sideData.date}</p>                        
                </div> 
                <hr/>   
            </div>  
        )
    }
}