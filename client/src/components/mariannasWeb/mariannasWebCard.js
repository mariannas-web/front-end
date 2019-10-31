import React from 'react' 
import '../styles/mariannasWeb/mariannasWeb.css'

export default class UndergroundFeedCard extends React.Component{
    constructor(props){
        super(props)
        }

       

    render(){
        console.log(this.props.feed)
        return(
            <div className='web-container'>
                <h2>{this.props.feed.title}</h2>

                {!this.props.feed.youTubeVideo ? '': 
                    <iframe src={"https://www.youtube.com/embed/pdszgILrTr8"} style={{ height: '240px', width: '320px'}}/>
                }
                 
                <p>{this.props.feed.teaser}</p>
                <div className='footer'>
                    <a href={this.props.feed.link}>
                        <p>View Source Here</p> 
                    </a>   
                </div> 
                <hr style={{width: '100%'}}/>
            </div> 
        )
    }
}