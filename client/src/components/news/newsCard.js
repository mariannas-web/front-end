import React from 'react'
import './newsCard.css'


export default class NewsCard extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='card-container'>
        <div className="title">
          <p>{this.props.card.title}</p>
        </div> 
        <div className='article-image'>
          <img className='newsCard-image' src={this.props.card.image} />
        </div> 
        <div className='article-content'>
          <p>{this.props.card.teaser}</p> 
        </div> 
        <div className='links'>
          <a href={this.props.card.source}>Source</a> 
          <p>{this.props.card.date}</p>
          <p>More</p> 
        </div> 
      </div> 
    )
  }
}

