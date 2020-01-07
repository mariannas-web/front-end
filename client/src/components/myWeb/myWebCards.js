import React from 'react' 
import axiosWithAuth from '../auth/utils';
import MyWebCard from './myWebCard.js'
import {Link} from 'react-router-dom'
import '../styles/myWeb/myWebCard.css'

let web = require('./web1.png')
let typewriter = require('./typewriter.png')
let feed = require('./feed.png')


export default class MyWebCards extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userData: []
        } 
    }

    componentDidMount(){
        this.renderUserData()
    }

    renderUserData = () => {
        axiosWithAuth().get(`${process.env.REACT_APP_WEB_USER_API_KEY}${this.props.userid}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    userData: response.data.userPost
                })                               
            })
            .catch(error => {console.log('There was an error posting your content')
        })
    }

    render(){
        if(!this.state.userData){return <div className="loading-my-web">Loading your feed...</div>}
        return(
            <div>
                <div className='my-web-navbar'> 
                    <Link style={{color: "black", fontWeight: "bold", textDecoration: 'none'}} to='/myWebForm'><img style={{width: '28px', height: '24px'}}src={typewriter}/></Link>
                    <Link style={{color: "black", fontWeight: "bold", textDecoration: 'none'}} to='/mariannasWeb'><img style={{marginTop: '3px', width: '27px', height: '23px'}}src={web}/></Link>
                    <Link style={{color: "black", fontWeight: "bold", textDecoration: 'none'}} to='/myWebFeed'><img style={{width: '25px', height: '23px'}}src={feed}/></Link>
                </div> 
                <div className='myWeb-card-container'>
                {this.state.userData.length === 0 ? <div style={{margin: "200px auto"}}>You currently have no post</div> :
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
                </div>
            </div>
        )
    }
}