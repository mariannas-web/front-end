import React from 'react' 
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../styles/undergroundFeed/undergroundFeed.css'
import MariannasWebCard from './mariannasWebCard.js'
import axiosWithAuth from '../auth/utils'

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
                <div>
                    <Link to='/myWeb'>Back</Link>
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