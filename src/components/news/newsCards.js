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
        let newsCards = []
        let myLinks = [`${process.env.REACT_APP_POST_API_KEY}`,`${process.env.REACT_APP_USERPOST_API_KEY}` ]
            myLinks.map(item => (
                axios.get(item)
                    .then(response => {
                        newsCards.push(response.data)
                    })
                    .catch(error => { 
                        console.log("There was an error loading your content")
                    })   
            ))
            this.setState({
                newsCards
            })
    }


    render(){
        return(
            <div className='newsCards'>
                {[].concat.apply([],this.state.newsCards).map((card, index)=> {      //turning two arrays into one
                    return <NewsCard key={index} card={card}/> 
                })}
                <h1 style={{margin: "8px auto", fontFamily: "'Alegreya Sans', 'serif'"}}>Currents</h1> 
            </div> 
        )
    }
}