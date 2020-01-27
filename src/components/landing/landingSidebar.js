import React from 'react' 
import '../styles/landing/landingSidebar.css'

export default class LandingSidebar extends React.Component{
    constructor(props){
        super(props)
    }


    render(){
        return(
            <div className='sidebar-container'>
                <a href={this.props.sideData.url}><h4>{this.props.sideData.title}</h4></a>
                    <div className='author-published-container'>
                        <p>{this.props.sideData.author}</p>
                        <p>{this.props.sideData.published.slice(0, -14)}</p>
                    </div> 
                <hr/> 
            </div>  
        )
    }
}