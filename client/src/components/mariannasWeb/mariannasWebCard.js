import React from 'react' 
import axiosWithAuth from '../auth/utils';
import axios from 'axios'
import '../styles/mariannasWeb/mariannasWeb.css'

export default class UndergroundFeedCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentUID: 0,
            isFollowed: false,
            title: '',
            image: '',
            description: '',
            url: ''
        }
    }

    componentDidMount(){
        this.getPreview(this.props.feed.link)
        axios.get(process.env.REACT_APP_USER_API_KEY)
            .then(response => {
                response.data.map(item => {
                    if(item.username === localStorage.getItem('username')){
                        this.setState({
                            currentUID: item.id
                        })
                    }
                })
            })
    }


    followHandler = (username) => {
        let postFollow = {
            user_id: this.state.currentUID,
            follow: username
        }
        axios.post(process.env.REACT_APP_USER_FAVS_API_KEY, postFollow)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log("there was an error posting the user", error)
            })
    }


    deleteHandler = (id) => {
        axiosWithAuth().delete(`${process.env.REACT_APP_USERPOST_API_KEY}/${id}`)
            .then(() => {
                return this.props.renderFeed()
            })
            .catch(error => {console.log("there was an error deleting the post")}
        )
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
                    <h2 style={{padding: '0px 15px', marginBottom: '0px', fontSize: '19px'}}>{this.props.feed.title}</h2>   
                </div>    
                <div className="user-info">
                    <h5 className="web-card-username">{this.props.feed['user.username']}</h5> 
                </div>                 
                <hr style={{width: "90%", textAlign:"center"}}/>
                {this.props.feed.youTube ? '' : 
                <a href={this.state.url}>
                    <div className='link-preview'> 
                        {this.state.image === '' ? <div style={{position: 'relative', top: '20px'}}>Loading Link Preview...</div> : <img className='preview-image' src={this.state.image}/>}                                       
                        <h3>{this.state.title}</h3>                   
                    </div> 
                </a>
                }
                <div style={{display:"flex", justifyContent:"center"}}>
                    {!this.props.feed.youTube ? '': 
                        <iframe src={"https://www.youtube.com/embed/pdszgILrTr8"} style={{ height: '240px', width: '92%'}}/>
                    }
                </div> 
                <hr style={{width: "90%", textAlign:"center"}}/>         
                <div className='web-article-content'>
                    <p>{this.props.feed.teaser}</p> 
                </div>
                <div className="user-selectors">
                    <a onClick={() => {this.followHandler(this.props.feed['user.username'])}}>follow</a> 
                    <div className='delete-button'> 
                        {localStorage.getItem('username') === process.env.REACT_APP_ADMIN_KEY ? 
                            <button style={{height: "20px", marginBottom: '5px'}}onClick={() => { return this.deleteHandler(this.props.feed.id)}}>delete</button> : ""}               
                    </div> 
                    <a><p>{this.props.feed.date}</p></a>
                </div>                 
            </div> 
        )
    }
}

 

