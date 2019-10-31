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
        console.log(this.props.user)
        return(
            <div className='web-card-container'>
            <div className="username-thumbnail">
                <a>{localStorage.getItem('username')}</a>
            </div> 
            <hr  style={{width: "90%", textAlign:"center"}}/>

            <div className="web-title">
              <p>{this.props.title}</p>
            </div> 
            <div className='web-article-content'>
              <p>{this.props.teaser}</p> 
            </div> 
            <div className='web-links'>
              <a href={this.props.link}>Visit Source</a>
            </div>
            <hr  style={{width: "90%", textAlign:"center"}}/>

            <div className="user-selectors">
                <a>follow</a> 
                <a>date</a>
                <a>push article</a>
            </div> 
            <div className='delete-button'> 
                {localStorage.getItem('username') === process.env.REACT_APP_ADMIN_KEY ? 
                    <button onClick={() => { return this.deleteHandler(this.props.card.id)}}>delete</button> : ""}
            </div> 
          </div>  
        )
    }
}