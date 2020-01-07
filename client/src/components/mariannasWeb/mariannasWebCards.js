import React from 'react' 
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../styles/undergroundFeed/undergroundFeed.css'
import MariannasWebCard from './mariannasWebCard.js'
import axiosWithAuth from '../auth/utils'

let backArrow = require('./backarrow.png')
let typewriter = require('../myWeb/typewriter.png')
let feed = require('../myWeb/feed.png')

export default class MariannasWebCards extends React.Component{
    constructor(){
        super()
        this.state = {
            feed: [],
            
        }
    }

    componentDidMount(){
        this.renderFeed()
    }

    shuffleNews = (array) =>  {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

    renderFeed = () => {
        axiosWithAuth().get(`${process.env.REACT_APP_USERPOST_API_KEY}`)
          .then(response => {
              this.setState({
                feed: this.shuffleNews(response.data)
              })
          })
          .catch(error => {console.log('there was an error', error)})
      }

    render(){
        if(!this.state.feed){return <div>loading</div> }

        return(
            <div>
                <div className='my-web-navbar'>
                    <Link to='/myWeb'><img className='mariannas-web-navbar' style={{width: '26px', height: '23px'}} src={backArrow}/></Link>
                    <Link style={{color: "black", fontWeight: "bold", textDecoration: 'none'}} to='/myWebForm'><img style={{width: '28px', height: '24px'}}src={typewriter}/></Link>
                    <Link style={{color: "black", fontWeight: "bold", textDecoration: 'none'}} to='/myWebFeed'><img style={{width: '25px', height: '23px'}}src={feed}/></Link>              
                </div> 
                <div className='underground-card-container'>
                    {this.state.feed.map((item, index) => {
                        return <MariannasWebCard feed={item} key={index} /> 
                    })}
                </div>
            </div> 
        )
    }
}