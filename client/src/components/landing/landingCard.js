import React from 'react'
import '../news/newsCard.css'


export default class LandingCard extends React.Component{
  constructor(props){
    super(props)
  }

    render(){
        console.log(this.props.card)
        return(
            <div className='card-container'>

            <div className="mobile-container"> 
                <a href={this.props.card.url} style={{textDecoration:'none', color: 'black'}}>
                  <div className="title">
                      <p>{this.props.card.title}</p>
                  </div> 
                  <p className='author'>{this.props.card.author}</p> 
                  <hr  style={{width: "90%", textAlign:"center"}}/> 
                  <div className='article-image'>
                      <img className={this.props.card.image === 'null' || this.props.card.image === "None" ? 'hidden':'newsCard-image'} src={this.props.card.image} />
                  </div> 
                  <div className='timestamp'>{this.props.card.published.slice(0, -5)}</div> 
                  <div className='article-content'>
                      <p>{this.props.card.description}</p> 
                  </div> 
                  <hr  style={{position: "relative", bottom: "0", width: "90%", textAlign:"center"}}/> 
                </a>
                <div className='links'>View Article</div>
            </div> 
            </div> 
        )
    }
}
