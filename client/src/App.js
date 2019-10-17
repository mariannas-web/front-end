import React from 'react';
import Nav from './components/nav/nav'
import NewsCards from './components/news/newsCards'
import Menu from './components/menu/menu'
import './components/styles/menu/menu.css'
import PostNews from './components/postNews/postNews'
import {Route} from 'react-router-dom'
import RegisterForm from './components/forms/register'
import Carousel from './components/carousel/carousel'
import './App.css';

export default class App extends React.Component{

  activateMenu = () => {
    document.querySelector('.menu').classList.toggle('hide')
  }
 //<Menu/>    
 //<Route path='/postNews' component={PostNews}/> 
 //<NewsCards /> 
  render() {
    return (
      <div> 
          <Nav activateMenu={this.activateMenu}/> 
          <RegisterForm /> 
         
      </div>
    );
  }
}

