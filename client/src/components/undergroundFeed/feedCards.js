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
            items: this.shuffleNews(newsPubArray)
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
        axios(`${process.env.REACT_APP_UNDERGROUND_API_KEY}`)
          .then(response => {
              this.setState({
                feed: response.data.articles
              })
          })
          .catch(error => {console.log('there was an error', error)})
      }

    render(){
        if(!this.state.feed){return <div>loading</div> }
        this.state.items.map(game => {
            this.state.feed.map(item => {
               console.log(item[game])
           })
        })

        return(
            <div className='underground-card-container'>
                {this.state.items.map(game => {
                    return  this.state.feed.map((item, index) => {
                        return <UndergroundFeedCard key={index} feed={item[game]}/>
                        })
                    })
                }   
            </div> 
        )
    }
}