import React from 'react'
import axiosWithAuth from '../auth/utils';
import '../styles/myWeb/myWebCard.css'

import {Redirect} from 'react-router-dom'


export default class MyWebCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFollowed: false,
            title: '',
            image: '',
            description: '',
            url: ''
        }
    }

    componentDidMount(){
        this.getPreview(this.props.link)       
    }

    deleteHandler = (id) => {
        axiosWithAuth().delete(`${process.env.REACT_APP_USERPOST_API_KEY}/${id}`)
            .then(() => {
                return this.props.renderUserData()
            })
            .catch(error => {
                console.log("There was an error deleting the post", error)
            }
        )
    }

    followUser = () => {
        if(this.state.isFollowed){
            this.setState({
                isFollowed: true
            })
        }
    }

    getPreview = (link) => {
        axiosWithAuth().get(`https://api.linkpreview.net/?key=${process.env.REACT_APP_LINK_PREVIEW}=${link}`)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    image: response.data.image,
                    description: response.data.description,
                    url: response.data.url
                })
            })
            .catch(error => {
                console.log('error loading your content', error)
           })
    }

    
    render(){
        return(
            <div className='web-card-container'>           
                <div>
                    <p className='card-title'>{this.props.title}</p>   
                </div>    
                <div className="user-info">
                    <a href='https://www.rlmclaughlin.com/'>@{localStorage.getItem('username')}</a>
                </div>                 
                <hr style={{width: "90%", textAlign:"center"}}/>
                {this.props.youTube ? '' : 
                    <a style={{textDecoration: 'none'}}href={this.state.url}>
                        <div className='link-preview'> 
                            {this.state.image === '' ? <div style={{position: 'relative', top: '20px'}}>Loading Link Preview...</div> : <img alt='thumbnail preview' className='preview-image' src={this.state.image}/>}                                       
                            <h3>{this.state.title}</h3>                   
                        </div> 
                    </a>
                }
                <div style={{display:"flex", justifyContent:"center"}}>
                    {!this.props.youTube ? '': 
                        <iframe title='youtube link' src={this.props.youTube} style={{ height: '240px', width: '92%'}}/>
                    }
                </div> 
                <hr style={{width: "90%", textAlign:"center"}}/>         
                <div className='web-article-content'>
                    <p className='content-padding'>{this.props.teaser}</p> 
                </div>
                <div className="user-selectors">
                    <a><p style={{marginBottom: '0px'}}>Subscribe</p></a> 
                    <div className='delete-button'> 
                        {localStorage.getItem('username') === process.env.REACT_APP_ADMIN_KEY ? 
                            <button style={{height: "20px"}}onClick={() => { return this.deleteHandler(this.props.id)}}>delete</button> : ""}               
                    </div> 
                    <p style={{marginBottom: '0px'}}>{this.props.date}</p>
                </div>                 
            </div>  
        )
    }
}