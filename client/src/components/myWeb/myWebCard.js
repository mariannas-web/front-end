import React from 'react'


export default class MyWebCard extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <h2>{this.props.title}</h2>
                <p>{this.props.teaser}</p> 
                <p>{this.props.links}</p> 
                <p>{this.props.youTubeVideo}</p> 
            </div> 
        )
    }
}