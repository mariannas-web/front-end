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
                    <div className='author-timestamp-container'> 
                        <p className='author'>@{this.props.card.author}</p> 
                        <p className='timestamp'>{this.props.card.published.slice(0, -14)}</p> 
                    </div>                    
                    <div className='image-content-container'>
                        <div className='article-image'> 
                            <img alt='newscard thumbnail' className={this.props.card.image === 'null' || this.props.card.image === "None" ? 'hidden':'newsCard-image'} src={this.props.card.image} />
                        </div> 
                        <div className='title-links-container'>
                            <div className="title">
                                <p>{this.props.card.title}</p>
                            </div> 
                            <div className='links'>View Article</div>
                        </div> 
                    </div> 
                </div> 
            </div> 
        )
    }
}
