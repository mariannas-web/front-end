import React from 'react'
import axiosWithAuth from '../auth/utils';
import {Redirect} from 'react-router-dom'

export default class MyWebCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFollowed: false
        }
    }

    deleteHandler = (id) => {
        axiosWithAuth().delete(`${process.env.REACT_APP_USERPOST_API_KEY}/${id}`)
            .then(() => {
                return this.props.renderUserData()
            })
            .catch(error => {console.log("there was an error deleting the post")}
        )
    }

    followUser = () => {
        if(this.state.isFollowed){
            this.setState({
                isFollowed: true
            })
        }
    }
    
    render(){
        console.log(this.props.user)
        return(
            <div className='web-card-container'>
             <div className="myWeb-box">General</div> 

                <div className="web-title">
                   <div>
                    <p>{this.props.title}</p>
                    <h5 className="web-card-username">{localStorage.getItem('username')}</h5> 
                   </div> 
                </div> 
                {!this.props.youTube ? '': 
                    <iframe src={"https://www.youtube.com/embed/pdszgILrTr8"} style={{ height: '240px', width: '320px'}}/>
                }
                <hr style={{width: "90%", textAlign:"center"}}/>
                <div className='web-article-content'>
                    <p>{this.props.teaser}</p> 
                </div> 
                <div className='web-links'>
                    <a href={this.props.link}>Visit Source</a>
                </div>
                <hr  style={{width: "90%", textAlign:"center"}}/>
                <div className="user-selectors">
                    <a>follow</a> 
                    <a>{this.props.date}</a>
                    <a>push article</a>
                </div> 
                <div className='delete-button'> 
                    {localStorage.getItem('username') === process.env.REACT_APP_ADMIN_KEY ? 
                        <button onClick={() => { return this.deleteHandler(this.props.id)}}>delete</button> : ""}
                </div> 
          </div>  
        )
    }
}