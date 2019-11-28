import React from 'react'
import PoliticalFeedCard from './politicalFeedCard'
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
                console.log("There was an error loading your content")
           })
    }


    render(){       
        if(!this.state.politicalFeed.length){
            return <div className='loading-political'>Loading your political feed...</div>
        }
        return(
            <div className='newsCards'>
                {this.state.politicalFeed.map(card => {
                    for(let i = 0; i < 15; i++){
                        if(card.category[i]){
                            return <PoliticalFeedCard key={card.id} card={card}/>  
                        }
                    }
                })}
               <h1 style={{fontWeight: "none", fontSize: '28px', margin: "8px auto", fontFamily: "'Playfair Display', 'serif'"}}>Political Feed</h1> 
            </div> 
        )
    }
}