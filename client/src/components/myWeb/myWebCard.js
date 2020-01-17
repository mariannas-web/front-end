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

    getPreview = (link) => {
        axiosWithAuth().get(`http://api.linkpreview.net/?key=${process.env.REACT_APP_LINK_PREVIEW}=${link}`)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    image: response.data.image,
                    description: response.data.description,
                    url: response.data.url
                })
            })
    }
    
    render(){
        return(
            <div className='web-card-container'>           
                <div>
                    <h2 style={{padding: '0px 15px', marginBottom: '0px', fontSize: '19px'}}>{this.props.title}</h2>   
                </div>    
                <div className="user-info">
                    <a href='#'>@{localStorage.getItem('username')}</a>
                </div>                 
                <hr style={{width: "90%", textAlign:"center"}}/>
                {this.props.youTube ? '' : 
                <a href={this.state.url}>
                    <div className='link-preview'> 
                        {this.state.image === '' ? <div style={{position: 'relative', top: '20px'}}>Loading Link Preview...</div> : <img className='preview-image' src={this.state.image}/>}                                       
                        <h3>{this.state.title}</h3>                   
                    </div> 
                </a>
                }
                <div style={{display:"flex", justifyContent:"center"}}>
                    {!this.props.youTube ? '': 
                        <iframe src={"https://www.youtube.com/embed/pdszgILrTr8"} style={{ height: '240px', width: '92%'}}/>
                    }
                </div> 
                <hr style={{width: "90%", textAlign:"center"}}/>         
                <div className='web-article-content'>
                    <p>{this.props.teaser}</p> 
                </div>
                <div className="user-selectors">
                    <a><p>follow</p></a> 
                    <div className='delete-button'> 
                        {localStorage.getItem('username') === process.env.REACT_APP_ADMIN_KEY ? 
                            <button style={{height: "20px", marginBottom: '5px'}}onClick={() => { return this.deleteHandler(this.props.id)}}>delete</button> : ""}               
                    </div> 
                    <a><p>{this.props.date}</p></a>
                </div>                 
            </div>  
        )
    }
}