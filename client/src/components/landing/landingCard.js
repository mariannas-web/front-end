import React from 'react'
import '../news/newsCard.css'
const spiderWeb = require('./noun_Spider Web_1349738.png')

export default class LandingCard extends React.Component{
  constructor(props){
    super(props)
  }



    render(){
        console.log(this.props.card)
        return(
            <div className='card-container'>
            <a href={this.props.card.url} style={{textDecoration:'none', color: 'black'}}>
              <div className="title">
                <p>{this.props.card.title}</p>
              </div> 
              <p style={{paddingLeft: "13px", marginTop:'20px', marginBottom:'5px'}}>{this.props.card.author}</p> 

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
                <a href='#'>MW</a>
                
              </div>
              </a>
            </div> 
        )
    }
}
