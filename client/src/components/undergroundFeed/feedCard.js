import React from 'react' 


export default class UndergroundFeedCard extends React.Component{
    constructor(props){
        super(props)

        }

        
        

    render(){
        console.log(this.props.feed.image)
        return( 
            <div className='underground-feed-container'>
                <div className='underground-content-container'> 
                    <h2>{this.props.feed.title}</h2>
                    <p>{this.props.feed.teaser}</p>
                </div>    
                <div className='footer'>
                    <a href={this.props.feed.link}>
                        <p>{this.props.feed.source}</p> 
                        <img src={this.props.feed.image}/>
                    </a>   
                </div> 
            </div> 
        )
    }
}