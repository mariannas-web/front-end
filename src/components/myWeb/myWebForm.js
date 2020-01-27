import React from 'react' 
import axiosWithAuth from '../auth/utils'
import {Link} from 'react-router-dom'
import '../styles/myWeb/myWebForm.css'
import MyWebFormSidebar from './myWebFormSidebar'

let web = require('./web1.png')
let feed = require('./feed.png')
let backArrow = require('../mariannasWeb/backarrow.png')

export default class MyWebForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            teaser: '',
            link: '',
            youtube: '',
            userData: []
        }
    }

    componentDidMount(){
        this.renderUserData()
    }

    getDate = () => {
        let currentTime = new Date()
        let month = currentTime.getMonth() + 1
        let day = currentTime.getDate()
        let year = currentTime.getFullYear()
        return month + "/" + String(day) + "/" + String(year)
    }

    wordCount(str, max) {
        let lng = str.length;
        let deduct =  max - lng
        if(deduct === 0){
            return "Limit Reached"
        } else {
            return deduct
          }
    }

    changeHandler = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
        this.youTubeHandler(this.state.youtube)
    }

    youTubeHandler = (url) => {
        let youTubeArray = []
        url = url.split('')
        for(let i = 0; i < url.length; i++){
            if(i < 24){
                youTubeArray.push(url[i])
            } else if( i === 32){
               youTubeArray.push('embed/')
            } else if(i > 32){
              youTubeArray.push(url[i])
            }           
        }
        return youTubeArray.join('')
    }
   
    submitHandler = (event) => {
        event.preventDefault()
        const myWebPost = {
            user_id: this.props.userid,
            title: this.state.title,
            teaser: this.state.teaser,
            link: this.state.link,
            youTubeVideo: this.youTubeHandler(this.state.youtube),
            date: this.getDate()
        }
        
        axiosWithAuth().post(`${process.env.REACT_APP_USERPOST_API_KEY}`, myWebPost)
            .then(() => {
                this.props.history.push('/myWeb')
            })
            .catch(error => {
                console.log("There was an error posting your content", error)
            })
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

    render(){ 
        return(
            <div className='desktop-container'>
                <div className='myWeb-sidebar'>
                    <h2>{localStorage.getItem('username')}'s Posts</h2>
                    <div>
                        {this.state.userData.map((item, index) => (
                           index <= 20 ?
                                <MyWebFormSidebar sideData={item} key={index}/> : ''
                        ))}
                    </div> 
                </div> 
                <div className='navbar-myWebCards-container'> 
                    <div className='my-web-navbar'> 
                        <Link to='/myWeb'><img alt='back arrow' className='mariannas-web-navbar' style={{width: '26px', height: '23px'}} src={backArrow}/></Link>
                        <Link style={{color: "black", fontWeight: "bold", textDecoration: 'none'}} to='/mariannasWeb'><img alt='spider web' style={{marginTop: '3px', width: '27px', height: '23px'}}src={web}/></Link>
                        <Link style={{color: "black", fontWeight: "bold", textDecoration: 'none'}} to='/myWebFeed'><img alt='newspaper' style={{width: '25px', height: '23px'}}src={feed}/></Link>
                    </div> 
                    <div className='myWeb-form-container'>
                        <h1 className='post-news-header'>Post News</h1>
                        <form onSubmit={this.submitHandler}>
                            <input name='title'
                                   placeholder='title' 
                                   maxLength='50'
                                   value={this.state.title}
                                   onChange={this.changeHandler}
                                   type='text'/> 
                            <textarea name='teaser'
                                      placeholder='teaser'
                                      maxLength='225'
                                      value={this.state.teaser}
                                      onChange={this.changeHandler}
                                      type='text' />          
                            <input name='link'
                                   placeholder='link'
                                   value={this.state.link}
                                   onChange={this.changeHandler}
                                   type='text'/>
                            <input name='youtube'
                                   placeholder='youtube'
                                   value={this.state.youTubeVideo}
                                   onChange={this.changeHandler}
                                   type='text'/> 
                            <p onClick={this.submitHandler}>Submit</p>
                        </form>
                    </div>
                </div> 
            </div>
        )
    }
}