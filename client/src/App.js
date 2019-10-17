import React from 'react';
import Nav from './components/nav/nav'
import NewsCards from './components/news/newsCards'
import Menu from './components/menu/menu'
import './components/styles/menu/menu.css'
import PostNews from './components/postNews/postNews'
import {Route} from 'react-router-dom'
import RegisterForm from './components/forms/register'
import Carousel from './components/carousel/carousel'
import LoginForm from './components/forms/login'
import './App.css';
import {PrivateRoute} from './components/auth/privateRoute'

export default class App extends React.Component{

  activateMenu = () => {
    document.querySelector('.menu').classList.toggle('hide')
  }
    
 //<Route path='/postNews' component={PostNews}/> 
 //<NewsCards /> 
 // 
  render() {
    return (
      <div> 
          <Nav activateMenu={this.activateMenu}/> 
          <Menu/> 
          <Route exact path='/register' component={RegisterForm} /> 
          <Route exact path='/login' component={LoginForm} /> 
          <PrivateRoute exact path='/postNews' component={PostNews} /> 
      </div>
    );
  }
}

