import React from 'react' 
import axiosWithAuth from '../auth/utils';
import axios from 'axios'
import '../styles/mariannasWeb/mariannasWeb.css'

export default class MariannasWebCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentUID: 0,
            title: '',
            image: '',
            description: '',
            url: '',
            favs: [],
            isFollowed: false
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
        this.renderFavs()
    }


    renderFavs = () => {
        axiosWithAuth().get(process.env.REACT_APP_USER_FAVS_API_KEY)
            .then(response => {
                this.setState({
                    favs: response.data
                })
                this.state.favs.map(item => {
                    if(item['user.username'] === localStorage.getItem('username') && item.follow === this.props.feed['user.username']){
                        this.setState({
                            isFollowed: true
                        })
                    }
                })
            })  
            .catch(error => {
                console.log('There was an error retrieving data', error)
            })
    }


    followHandler = (username) => {
        let postFollow = {
            user_id: this.state.currentUID,
            follow: username,
        } 
        if(!this.state.favs.length){
            axios.post(process.env.REACT_APP_USER_FAVS_API_KEY, postFollow)
                .then(response => {
                    console.log(response)
                    this.props.renderFeed()
                })
                .catch(error => {
                    console.log("there was an error posting the user", error)
                })           
        }
        this.state.favs.map(item => {
            if(item['user.username'] === localStorage.getItem('username') && item.follow !== username){
                axios.post(process.env.REACT_APP_USER_FAVS_API_KEY, postFollow)
                    .then(response => {
                        console.log(response)
                        this.props.renderFeed()
                    })
                    .catch(error => {
                        console.log("there was an error posting the user", error)
                    })
            }   
            console.log('fuck off')
        })
    }

    followDeleteHandler = (username) => {
        console.log(username)
        this.state.favs.map(item => {
            if(item['user.username'] === localStorage.getItem('username') && item.follow === username){
                axiosWithAuth().delete(`${process.env.REACT_APP_USERPOST_API_KEY}/${item.id}`)
                    .then(() => {
                        return this.props.renderFeed()
                    })
                    .catch(error => {
                        console.log("there was an error deleting the post", error)
                    })
            }
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
        console.log(this.state.favs)
        return(
            <div className='web-card-container'>           
                <div>
                    <h2 style={{padding: '0px 15px', marginBottom: '0px', fontSize: '19px'}}>{this.props.feed.title}</h2>   
                </div>    
                <div className="user-info">
                    <a href='#' className="web-card-username">@{this.props.feed['user.username']}</a> 
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
                    {!this.state.isFollowed ? <a className='followHandler' onClick={() => {this.followHandler(this.props.feed['user.username'])}}>follow</a> : <a onClick={() => {this.followDeleteHandler(this.props.feed['user.username'])}}>Unfollow</a>}
                    
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

 

