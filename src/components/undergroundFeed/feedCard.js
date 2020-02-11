import React from 'react' 
import axiosWithAuth from '../auth/utils'
import '../styles/myWeb/myWebCard.css'


export default class UndergroundFeedCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            image: '',
            description: '',
            url: ''
        }
    }

    componentDidMount(){
        this.getPreview(this.props.feed.link)

    }
    
    getPreview = (link) => {
        axiosWithAuth().post(`https://graph.facebook.com/v6.0/?scrape=true&id=${link}&access_token=${process.env.REACT_APP_LINK_PREVIEW}`)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    image: response.data.image[0].url,
                    description: response.data.description,
                    url: response.data.url
                })
            })
            .catch(error => {
                console.log("there was an error gathering the data", error)
            })
    }

    deleteHandler = (id) => {
        axiosWithAuth().delete(`${process.env.REACT_APP_POST_API_KEY}/${id}`)
            .then(() => {
                return this.props.renderFeed()
            })
            .catch(error => {
                console.log("there was an error deleting the post", error)
            }
        )
    }
        

    render(){
        return( 
            <div className='web-card-container'>           
                <div>
                    <h2 style={{padding: '0px 15px', marginBottom: '0px', fontSize: '19px'}}>{this.props.feed.title}</h2>   
                </div>    
                <div className="user-info">
                    <a href='https://www.rlmclaughlin.com/' className="web-card-username">@{localStorage.getItem('username')}</a> 
                </div>                 
                <hr style={{width: "90%", textAlign:"center"}}/>
                {this.props.feed.youTube ? '' : 
                    <a style={{textDecoration: 'none'}} href={this.state.url}>
                        <div className='link-preview'> 
                            {this.state.image === '' ? <div style={{position: 'relative', top: '20px'}}>Loading Link Preview...</div> : <img alt='preview thumbnail' className='preview-image' src={this.state.image}/>}                                       
                            <h3>{this.state.title}</h3>                   
                        </div> 
                    </a>
                }
                <div style={{display:"flex", justifyContent:"center"}}>
                    {!this.props.feed.youTube ? '': 
                        <iframe title='youtube thumbnail' src={"https://www.youtube.com/embed/pdszgILrTr8"} style={{ height: '240px', width: '92%'}}/>
                    }
                </div> 
                <hr style={{width: "90%", textAlign:"center"}}/>         
                <div className='web-article-content'>
                    <p className='content-padding'>{this.props.feed.teaser}</p> 
                </div>
                <div className="user-selectors">
                    {!this.state.isFollowed ? <a style={{marginBottom: '0px'}} className='followHandler' onClick={() => {this.followHandler(this.props.feed['user.username'])}}>Subscribe</a> : <a onClick={() => {this.followDeleteHandler(this.props.feed['user.username'])}}>Unsubscribe</a>}                   
                    <div className='delete-button'> 
                        {localStorage.getItem('username') === process.env.REACT_APP_ADMIN_KEY ? 
                            <button style={{height: "20px"}}onClick={() => { return this.deleteHandler(this.props.feed.id)}}>delete</button> : ""}               
                    </div> 
                    <p style={{marginBottom: '0px'}}>{this.props.feed.date}</p>
                </div>                 
            </div> 
        )
    }
}