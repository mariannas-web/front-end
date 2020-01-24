import React from 'react' 
import axios from 'axios'
import '../styles/undergroundFeed/undergroundFeed.css'
import UndergroundFeedCard from './feedCard.js'
import UndergroundSidebar from './undergroundSidebar'


export default class UndergroundFeedCards extends React.Component{
    constructor(){
        super()
        this.state = {
            feed: [],
            sidebarData: []
        }
    }

    componentDidMount(){
        this.renderFeed()
    }
    
    renderFeed = () => {
        axios(`${process.env.REACT_APP_POST_API_KEY}`)
            .then(response => {
                this.setState({
                  feed: response.data
                })
            })
            .catch(error => {
                console.log('there was an error', error)
            })
    }


    render(){
        if(this.state.feed.length === 0){return <div>loading your underground feed...</div> }

        return(
            <div className='desktop-container'>
                <div className='myWeb-sidebar'>
                    <h2>Underground Feed</h2>
                    <div>
                        {this.state.feed.map((item, index) => {
                            while(index <= 20){
                                return <UndergroundSidebar sideData={item} key={index}/> 
                            }
                        })}
                    </div> 
                </div> 
                <div className='navbar-myWebCards-container'> 
                    <div className='underground-card-container'> 
                        <h1 className='currents-banner-myWeb-top'>Underground Feed</h1>
                            {this.state.feed.map(item => {
                                return <UndergroundFeedCard feed={item} /> 
                            })}
                        <h1 className='currents-banner-myWeb'>Underground Feed</h1>          
                    </div> 
                </div> 
            </div> 
        )
    }
}