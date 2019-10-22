import React from 'react' 
import axios from 'axios'
import '../styles/undergroundFeed/undergroundFeed.css'
import UndergroundFeedCard from './feedCard.js'

export default class UndergroundFeedCards extends React.Component{
    constructor(){
        super()
        this.state = {
            feed: [],
            publications: ['mint', 'zerohedge'],
            items: ['zeroHedge', 'zeroHedge1', 'zeroHedge2']
        }
    }

    componentDidMount(){
        this.renderFeed()
    }

    renderFeed = () => {
        axios('https://mariannas-web.herokuapp.com/api/feed/zerohedge')
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