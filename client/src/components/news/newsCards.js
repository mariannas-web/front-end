import React from 'react'
import NewsCard from './newsCard'
import './newsCards.css'
import axios from 'axios'

export default class NewsCards extends React.Component{
    constructor(props){
      super(props);   
      this.state = {
        newsCards: []
      }
    }

    componentDidMount(){
      this.renderCards()
    }

    renderCards = () => {
      axios.get(`${process.env.REACT_APP_POST_API_KEY}`)
        .then(response => {
          this.setState({
            newsCards: response.data
          })
        })
        .catch(error => { 
          console.log("There was an error loading your content")
        })
    }


    render(){
      return(
        <div className='newsCards'>
          {this.state.newsCards.map(card => {
            return <NewsCard key={card.id} card={card}/> 
          })}
          <h1 style={{margin: "8px auto", fontFamily: "'Alegreya Sans', 'serif'"}}>Currents</h1> 
        </div> 
      )
    }
}