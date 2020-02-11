import React from 'react' 
import axiosWithAuth from '../auth/utils';
import MyWebCard from './myWebCard.js'
import {Link} from 'react-router-dom'
import '../styles/myWeb/myWebCard.css'
import MyWebSidebar from './myWebSidebar';
import axios from 'axios'

let web = require('./web1.png')
let typewriter = require('./typewriter.png')
let feed = require('./feed.png')


export default class MyWebCards extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userData: [],
            sidebarData: [],
            mariannasFeed: []
        } 
    }

    componentDidMount(){
        this.renderUserData()       
        this.renderSidebarData()
    }

    renderUserData = () => {
        axiosWithAuth().get(`${process.env.REACT_APP_WEB_USER_API_KEY}${this.props.userid}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    userData: response.data.userPost
                })                               
            })
            .catch(error => {
                console.log('There was an error posting your content', error)
            })
    }

    renderSidebarData = () => {
        axios.get(process.env.REACT_APP_USER_FAVS_API_KEY)
            .then(response => {
                let myData = []
                response.data.map(item => {
                    if(item['user.username'] === localStorage.getItem('username')){
                        myData.push(item.follow)
                    }
                })
                this.renderUserPost(myData)
            })
            .catch(error => {
                console.log("There was an error rendering your data", error)
            })
    }

    renderUserPost = (fav) => {
        let sidebarData = []
        fav.map(favorite => {
            axios.get(`${process.env.REACT_APP_USERPOST_API_KEY}`)
                .then(response => {
                    response.data.map(item => {
                        if(item['user.username'] === favorite){
                           sidebarData.push(item)
                        }
                        this.setState({
                           sidebarData
                        })
                    })
                })
                .catch(error => {
                    console.log("There was an error", error)
                })
        })    
    }

    renderMariannasSidebar = () => {
        axiosWithAuth().get(`${process.env.REACT_APP_USERPOST_API_KEY}`)
            .then(response => {
                this.setState({
                    mariannasFeed: this.shuffleNews(response.data)
                })
            })
            .catch(error => {
                console.log('There was an error rendering the data', error)
            })
    }
    

    render(){
        if(!this.state.userData || !this.state.sidebarData){
            return <div className="loading-my-web">Loading your feed...</div>
        }
        return(
            <div className='desktop-container'>
                <div className='myWeb-sidebar'>
                    <h2>{localStorage.getItem('username')}'s feed</h2>
                    <div>
                        {this.state.sidebarData.map((item, index) => {
                            while(index <= 20){
                                return <MyWebSidebar sideData={item} key={index}/> 
                            }
                        })}
                    </div> 
                </div> 
                <div className='navbar-myWebCards-container'>
                    <div className='my-web-navbar'> 
                        <Link style={{color: "black", fontWeight: "bold", textDecoration: 'none'}} to='/myWebForm'><img alt='typewriter' style={{width: '28px', height: '24px'}} src={typewriter}/></Link>
                        <Link style={{color: "black", fontWeight: "bold", textDecoration: 'none'}} to='/mariannasWeb'><img alt='spider web' style={{marginTop: '3px', width: '27px', height: '23px'}} src={web}/></Link>
                        <Link style={{color: "black", fontWeight: "bold", textDecoration: 'none'}} to='/myWebFeed'><img alt='newspaper' style={{width: '25px', height: '23px'}} src={feed}/></Link>
                    </div> 
                    <div className='myWeb-card-container'>
                    <h1 className='currents-banner-myWeb-top'>{localStorage.getItem('username')}'s Post</h1>
                        {this.state.userData.length === 0 ? <div style={{margin: "160px auto"}}>You currently have no post</div> :
                            this.state.userData.map((item, index) => {
                               return <MyWebCard key={index}
                                                 title={item.title}
                                                 id={item.id}
                                                 teaser={item.teaser}
                                                 link={item.link}
                                                 youTube={item.youTubeVideo}
                                                 renderUserData={this.renderUserData} 
                                                 date={item.date} /> 
                        })}
                        <h1 className='currents-banner-myWeb'>{localStorage.getItem('username')}'s Post</h1>
                    </div>
                </div> 
            </div>
        )
    }
}