import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import MyWebFeedCard from './myWebFeedCard'
import MyWebSidebar from '../myWeb/myWebSidebar';

let web = require('../myWeb/web1.png')
let typewriter = require('../myWeb/typewriter.png')
let backArrow = require('../mariannasWeb/backarrow.png')


export default class MyWebFeedCards extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            data: [],
            sidebarData: []
        }
    }

    componentDidMount(){
        this.renderCards()
    }

    renderCards = () => {
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
        let data = []
        fav.map(favorite => {
            axios.get(`${process.env.REACT_APP_USERPOST_API_KEY}`)
                .then(response => {
                    response.data.map(item => {
                        if(item['user.username'] === favorite){
                           data.push(item)
                        }
                        this.setState({
                            data
                        })
                    })
                })
                .catch(error => {
                    console.log("There was an error", error)
                })
        })    
    }

    render(){
        if(!this.state.data){ return <div>Loading ...</div> }
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
                        <Link to='/myWeb'><img className='mariannas-web-navbar' style={{width: '26px', height: '23px'}} src={backArrow}/></Link>
                        <Link style={{color: "black", fontWeight: "bold", textDecoration: 'none'}} to='/myWebForm'><img style={{width: '28px', height: '24px'}}src={typewriter}/></Link>
                        <Link style={{color: "black", fontWeight: "bold", textDecoration: 'none'}} to='/mariannasWeb'><img style={{marginTop: '3px', width: '27px', height: '23px'}}src={web}/></Link>
                    </div>  
                    <div className='underground-card-container'>
                        <h1 className='currents-banner-myWeb-top'>{localStorage.getItem('username')}'s feed</h1>
                        {this.state.data.map((item, index) => {
                            return <MyWebFeedCard key={index}
                                                  feed={item}
                                                  renderFeed={this.renderUserPost}/> 
                        })}
                        <h1 className='currents-banner-myWeb'>{localStorage.getItem('username')}'s feed</h1>
                    </div>
                </div> 
            </div>
        )
    }
}