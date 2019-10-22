import React from 'react' 

export default class UndergroundFeedCard extends React.Component{
    constructor(props){
        super(props)
        }

       

    render(){
        console.log(this.props.feed)
        return(
            <div className='underground-feed-container'>
                <h2>{this.props.feed.title}</h2>
                <div className='underground-feed-image'>
                    <img src={this.props.feed.image}/> 
                </div> 
                <p>{this.props.feed.teaser}</p>
                <div className='footer'>
                    <a href={this.props.feed.link}>
                        <p>{this.props.feed.source}</p> 
                    </a>   
                </div> 
                <hr style={{width: '100%'}}/>
            </div> 
        )
    }
}