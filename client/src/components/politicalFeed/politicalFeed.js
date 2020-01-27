import React from 'react'
import PoliticalFeedCard from './politicalFeedCard'
import LandingSidebar from '../landing/landingSidebar'
import '../styles/landing/landingSidebar.css'
import '../news/newsCards.css'
import axios from 'axios'


export default class PoliticalFeed extends React.Component{
    constructor(props){
        super(props);   
        this.state = {
            politicalFeed: []
        }
    }

    componentDidMount(){
        this.renderPoliticalFeed()
    }

    renderPoliticalFeed = () => {
        axios.get(`https://api.currentsapi.services/v1/search?category=politics&language=en&apiKey=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
                this.setState({
                    politicalFeed: response.data.news
                })
            })
            .catch(error => { 
                console.log("There was an error loading your content", error)
           })
    }


    render(){       
        if(!this.state.politicalFeed.length){
            return <div className='loading-political'>Loading your political feed...</div>
        }
        return(
            <div className='desktop-landing-container'>
                <div className='desktop-sidebar'>
                    <h2>Political Feed</h2> 
                    {this.state.politicalFeed.map((data, index) => {
                        for(let i = 0; i < 20; i++){
                            if(data.category[i]){
                                return <LandingSidebar sideData={data} key={index}/>  
                            }
                        }
                    })} 
                </div> 
                <div className='newsCards'>
                    {this.state.politicalFeed.map(card => {
                        for(let i = 0; i < 15; i++){
                            if(card.category[i]){
                                return <PoliticalFeedCard key={card.id} card={card}/>  
                            }
                        }
                    })}
                   <h1 className='currents-banner'>Political Feed</h1> 
                </div> 
            </div>
        )
    }
}