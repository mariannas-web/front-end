import React from 'react';
import Nav from './components/nav/nav'
import NewsCards from './components/news/newsCards'
import Menu from './components/menu/menu'
import './components/styles/menu/menu.css'
import PostNews from './components/postNews/postNews'
import UndergroundFeedCards from './components/undergroundFeed/feedCards'
import MariannasWebCards from './components/mariannasWeb/mariannasWebCards'
import {Route} from 'react-router-dom'
import RegisterForm from './components/forms/register'
import PoliticalFeed from './components/politicalFeed/politicalFeed'
import LoginForm from './components/forms/login'
import './App.css';
import {PrivateRoute} from './components/auth/privateRoute'
import Chat from './components/chat/chat'
import LandingCards from './components/landing/landingCards'
import MyWebCards from './components/myWeb/myWebCards'
import MyWebForm from './components/myWeb/myWebForm'
import MyWebFeedCards from './components/myWebFeed/myWebFeedCards'
import axiosWithAuth from './components/auth/utils'

export default class App extends React.Component{
    constructor(){
      super()
      this.state = {
        userid: null,
        loggedIn: false
      }
    }

  activateMenu = () => {
      document.querySelector('.menu').classList.toggle('hide')
  }

  componentDidMount(){
      axiosWithAuth().get(`${process.env.REACT_APP_USER_API_KEY}`)
           .then(response => {
               const username = localStorage.getItem('username')
               response.data.map(item => {
                   if(item.username === username){
                       this.setState({
                           userid: item.id,
                           loggedIn: true
                       })                        
                   }
               })
           })
           .catch(error => {console.log('There was an error posting your content')})
  }

  render() {
    return (
      <div className='content'> 
          <Nav loggedIn={this.state.loggedIn} activateMenu={this.activateMenu}/> 
          <Menu loggedIn={this.state.loggedIn} activateMenu={this.activateMenu}/> 
          <Route exact path='/register' component={RegisterForm} /> 
          <Route exact path='/login' component={LoginForm} /> 
          <Route exact path='/' component={LandingCards} /> 
          <Route exact path='/politicalFeed' component={PoliticalFeed}/>
          
          <Route exact path="/myWeb" render = {props => (
              <MyWebCards {...props} userid={this.state.userid} />
          )}/>  

          <Route exact path="/myWebForm" render = {props => (
              <MyWebForm {...props} userid={this.state.userid} />
          )}/>  
          <Route exact path='/mariannasWeb' component={MariannasWebCards} /> 
          <PrivateRoute exact path='/postNews' component={PostNews} /> 
          <PrivateRoute exact path='/chat' component={Chat} />
          <PrivateRoute exact path='/undergroundFeed' component={UndergroundFeedCards}/>
          <PrivateRoute exact path='/myWebFeed' component={MyWebFeedCards} /> 
      </div>
    );
  }
}

