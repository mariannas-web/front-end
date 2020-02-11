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
            .then(response => (
                response.data.forEach(item => {
                    if(item.username === localStorage.getItem('username')){
                        this.setState({
                            currentUID: item.id
                        })
                    }
                })
            ))
        this.renderFavs()
    }


    renderFavs = () => {
        axiosWithAuth().get(process.env.REACT_APP_USER_FAVS_API_KEY)
            .then(response => {
                this.setState({
                    favs: response.data
                })
                this.state.favs.forEach(item => {
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
                    console.log("There was an error posting the user", error)
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
            console.log('Successfully Unsubscribed')
        })
    }

    followDeleteHandler = (username) => {
        console.log(username)
        this.state.favs.map(item => {
            if(item['user.username'] === localStorage.getItem('username') && item.follow === username){
                axiosWithAuth().delete(`${process.env.REACT_APP_USER_FAVS_API_KEY}/${item.id}`)
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
            .catch(error => {
                console.log("there was an error deleting the post", error)
            }
        )
    }

    getPreview = (link) => {
        axiosWithAuth().post(`https://graph.facebook.com/v6.0/?scrape=true&id=${link}&access_token=${process.env.REACT_APP_LINK_PREVIEW}`)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    image: response.data.image[0].url,
                    description: response.data.description,
                    url: response.data.url
                })
            })
            .catch(error => {
                console.log("there was an error gathering your data", error)
            })
    }
    
    render(){
        return(
            <div className='web-card-container'>           
                <div>
                    <h2 className='card-title'>{this.props.feed.title}</h2>   
                </div>    
                <div className="user-info">
                    <a href='https://www.rlmclaughlin.com/' className="web-card-username">@{this.props.feed['user.username']}</a> 
                </div>                 
                <hr style={{width: "90%", textAlign:"center"}}/>
                {this.props.feed.youTubeVideo ? '' : 
                    <a style={{textDecoration: 'none'}} href={this.state.url}>
                        <div className='link-preview'> 
                            {this.state.image === '' ? <div style={{position: 'relative', top: '20px'}}>Loading Link Preview...</div> : <img alt='preview thumbnail' className='preview-image' src={this.state.image}/>}                                       
                            <h3>{this.state.title}</h3>                   
                        </div> 
                    </a>
                }
                <div style={{display:"flex", justifyContent:"center"}}>
                    {!this.props.feed.youTubeVideo ? '': 
                        <iframe title='youtube link' src={this.props.feed.youTubeVideo} style={{ height: '240px', width: '92%'}}/>
                    }
                </div> 
                <hr style={{width: "90%", textAlign:"center"}}/>         
                <div className='web-article-content'>
                    <p className='content-padding'>{this.props.feed.teaser}</p> 
                </div>
                <div className="user-selectors">
                    {!this.state.isFollowed ? <a style={{marginBottom: '0px'}} className='followHandler' onClick={() => {this.followHandler(this.props.feed['user.username'])}}>Subscribe</a> : <a onClick={() => {this.followDeleteHandler(this.props.feed['user.username'])}}>Unsubscribe</a>}                   
                    <div className='delete-button'> 
                        {localStorage.getItem('username') === process.env.REACT_APP_ADMIN_KEY ? 
                            <button style={{height: "20px"}}onClick={() => { return this.deleteHandler(this.props.feed.id)}}>delete</button> : ""}               
                    </div> 
                    <p style={{marginBottom: '0px'}}>{this.props.feed.date}</p>
                </div>                 
            </div> 
        )
    }
}

 

