import React from 'react'
import ScienceFeedCard from './scienceFeedCard'
import ScienceFeedSidebar from './scienceFeedSidebar'
import '../styles/landing/landingSidebar.css'
import '../news/newsCards.css'
import axios from 'axios'


export default class ScienceFeedCards extends React.Component{
    constructor(props){
        super(props);   
        this.state = {
            scienceFeed: []
        }
    }

    componentDidMount(){
        this.renderScienceFeed()
    }

    renderScienceFeed = () => {
        axios.get(`https://api.currentsapi.services/v1/search?category=science&language=en&apiKey=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
                this.setState({
                    scienceFeed: response.data.news
                })
            })
            .catch(error => { 
                console.log("There was an error loading your content", error)
           })
    }


    render(){       
        if(!this.state.scienceFeed.length){
            return <div className='loading-political'>Loading your science feed...</div>
        }
        return(
            <div className='desktop-landing-container'>
                <div className='desktop-sidebar'>
                    <h2>Science Feed</h2> 
                    {this.state.scienceFeed.map((data, index) => {
                        for(let i = 0; i < 20; i++){
                            if(data.category[i]){
                                return <ScienceFeedSidebar sideData={data} key={index}/>  
                            }
                        }
                    })} 
                </div> 
                <div className='newsCards'>
                    {this.state.scienceFeed.map(card => {
                        for(let i = 0; i < 15; i++){
                            if(card.category[i]){
                                return <ScienceFeedCard key={card.id} card={card}/>  
                            }
                        }
                    })}
                   <h1 className='currents-banner'>Science Feed</h1> 
                </div> 
            </div>
        )
    }
}