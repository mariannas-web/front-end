import React from 'react'
import '../news/newsCard.css'


export default class LandingCard extends React.Component{
    constructor(props){
    super(props)
    }

    checkContent = (item) => {
        let splitItem = item.split(' ')
        for(let i = 0; i < splitItem.length; i++){
            if(splitItem[i] === 'document.getElementById("linkPremium").innerHTML'){
                item = 'Click on article for additional information'
            }
        } 
        return item
    }

    render(){
        return(
            <div className='card-container'>
                <div className="mobile-container"> 
                    <a href={this.props.card.url} style={{textDecoration:'none', color: 'black'}}>
                        <div className="title">
                            <p>{this.props.card.title}</p>
                        </div> 
                        <p className='author'>{this.props.card.author}</p> 
                        <hr className='feeds-hr'/> 
                        <div className='cat'>
                            <div className='article-image'> 
                                    <img alt='newscard thumbnail' className={this.props.card.image === 'null' || this.props.card.image === "None" ? 'hidden':'newsCard-image'} src={this.props.card.image} />
                                 
                            </div> 
                            <div className='timestamp'>{this.props.card.published.slice(0, -5)}</div> 

                            <div className='article-content'>
                                <p>{this.checkContent(this.props.card.description)}</p>
                            </div> 
                        </div> 
                        <hr className='feeds-hr'/>                     
                        <div className='links'>View Article</div>
                    </a>
                </div> 
            </div> 
        )
    }
}
