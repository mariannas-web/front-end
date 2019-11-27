import React from 'react' 
import axiosWithAuth from '../auth/utils';
import MyWebCard from './myWebCard.js'
import {Link} from 'react-router-dom'
import '../styles/myWeb/myWebCard.css'
const web = require('./web.png');



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
        if(!this.state.userData){return <div>Loading your content...</div>}
        return(
            <div>
                <div className='my-web-navbar'> 
                    <Link to='/myWebForm'>Post News</Link>
                    <Link to='/mariannasWeb'>Mariannas</Link>
                    <Link to='/myFeed'>My Web</Link>
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