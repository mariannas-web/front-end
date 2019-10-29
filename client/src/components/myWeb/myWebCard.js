import React from 'react'
import axiosWithAuth from '../auth/utils';


export default class MyWebCard extends React.Component{
    constructor(props){
        super(props)
    }

    deleteHandler = () => {
        axiosWithAuth().delete()
    }

    render(){
        return(
            <div className='card-container'>
            <div className="title">
              <p>{this.props.title}</p>
            </div> 
            <hr  style={{width: "90%", textAlign:"center"}}/> 
            <div className='article-content'>
              <p>{this.props.teaser}</p> 
            </div> 
            <hr  style={{width: "90%", textAlign:"center"}}/> 
            <div className='links'>
              <a href={this.props.link}>Source</a>
            </div>
            <div className='delete-button'> 
                {localStorage.getItem('username') === process.env.REACT_APP_ADMIN_KEY ? 
                    <button onClick={() => { return this.deleteHandler(this.props.card.id)}}>delete</button> : ""}
            </div> 
          </div>  
        )
    }
}