import React from 'react'
import axios from 'axios'
import '../news/newsCard.css'


export default class PoliticalFeedCard extends React.Component{
  constructor(props){
    super(props)
  }


    deleteHandler = (id) => {
        axios.delete(`https://mariannas-web.herokuapp.com/api/post/${id}`)
            .then(response => {
                console.log('the user has been deleted')
                window.location.reload()
            })
            .catch(error => {console.log("There was an error deleting the user")})
    }

    render(){
        console.log(this.props.card)
        return(
            <div className='card-container'>
              <div className="title">
                <p>{this.props.card.title}</p>
              </div> 
              <hr  style={{width: "90%", textAlign:"center"}}/> 
              <div className='article-image'>
                <img className='newsCard-image' src={this.props.card.image} />
              </div> 
              <div style={{textAlign: "center"}}>{this.props.card.published.slice(0, -5)}</div> 
              <div className='article-content'>
                <p>{this.props.card.description}</p> 
              </div> 
              <hr  style={{width: "90%", textAlign:"center"}}/> 
              <div className='links'>
                <a href={this.props.card.url}>Source</a> 
                <p>{this.props.card.date}</p>
                <p>{this.props.card.author}</p> 
              </div>
            </div> 
        )
    }
}
