import React from 'react' 
import axios from 'axios'
import {newsPubArray} from './newsPubArray'
import '../styles/undergroundFeed/undergroundFeed.css'
import UndergroundFeedCard from './feedCard.js'

export default class UndergroundFeedCards extends React.Component{
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
        axios(`${process.env.REACT_APP_POST_API_KEY}`)
          .then(response => {
              this.setState({
                feed: response.data
              })
          })
          .catch(error => {console.log('there was an error', error)})
      }

    render(){
        if(this.state.feed.length === 0){return <div>loading your underground feed...</div> }

        return(
            <div> 
                <h2 className='underground-header'>Underground Feed</h2> 
                <div className='underground-card-container'>
                    {this.state.feed.map(item => {
                        return <UndergroundFeedCard feed={item} /> 
                    })}
                </div> 
            </div> 
        )
    }
}