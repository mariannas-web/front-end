import React from 'react'
import LandingCard from './landingCard'
import LandingSidebar from './landingSidebar'
import '../news/newsCards.css'
import axios from 'axios'


export default class LandingCards extends React.Component{
    constructor(props){
        super(props);   
        this.state = {
            currentsFeed: []
        }
    }

    componentDidMount(){
        this.renderPoliticalFeed()
    }

    renderPoliticalFeed = () => {
        axios.get(`https://api.currentsapi.services/v1/search?category=world&language=en&apiKey=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
                this.setState({
                    currentsFeed: response.data.news
                })
            })
            .catch(error => { 
                console.log("There was an error loading your content", error)
            })
    }


    render(){       
        if(!this.state.currentsFeed.length){
            return <div className='loading-political'>Loading your currents feed...</div>
        }
        return(
            <div className='desktop-landing-container'>
                <div className='desktop-sidebar'>
                    <h2>Currents Feed</h2> 
                    {this.state.currentsFeed.map((data, index) => {
                        for(let i = 0; i < 20; i++){
                            if(data.category[i]){
                                return <LandingSidebar sideData={data} key={index}/>  
                            }
                        }
                    })} 
                </div> 
                <div className='newsCards'>
                    {this.state.currentsFeed.map(card => {
                        for(let i = 0; i < 15; i++){
                            if(card.category[i]){
                                return <LandingCard key={card.id} card={card}/>  
                            }
                        }
                    })}
                <h1 className='currents-banner'>Currents</h1>
                </div> 
            </div> 
        )
    }
}