import React from 'react';
import Nav from './components/nav/nav'
import NewsCards from './components/news/newsCards'
import Menu from './components/menu/menu'
import './components/styles/menu/menu.css'
import PostNews from './components/postNews/postNews'
import UndergroundFeedCards from './components/undergroundFeed/feedCards'
import {Route} from 'react-router-dom'
import RegisterForm from './components/forms/register'
import PoliticalFeed from './components/politicalFeed/politicalFeed'
import LoginForm from './components/forms/login'
import './App.css';
import {PrivateRoute} from './components/auth/privateRoute'
import Chat from './components/chat/chat'
import LandingCards from './components/landing/landingCards'

export default class App extends React.Component{

  activateMenu = () => {
      document.querySelector('.menu').classList.toggle('hide')
  }

  render() {
    return (
      <div> 
          <Nav activateMenu={this.activateMenu}/> 
          <Menu activateMenu={this.activateMenu}/> 
          <Route exact path='/register' component={RegisterForm} /> 
          <Route exact path='/login' component={LoginForm} /> 
          <Route exact path='/' component={LandingCards} /> 
          <PrivateRoute exact path='/postNews' component={PostNews} /> 
          <PrivateRoute exact path='/chat' component={Chat} />
          <PrivateRoute exact path='/undergroundFeed' component={UndergroundFeedCards}/>
          <Route exact path='/politicalFeed' component={PoliticalFeed}/>
      </div>
    );
  }
}

