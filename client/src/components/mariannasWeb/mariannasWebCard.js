import React from 'react' 
import axios from 'axios'
import '../styles/mariannasWeb/mariannasWeb.css'

export default class UndergroundFeedCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentUID: 0
        }
    }

    componentDidMount(){
        axios.get('https://mariannas-web.herokuapp.com/api/user/')
            .then(response => {
                response.data.map(item => {
                    if(item.username === localStorage.getItem('username')){
                        this.setState({
                            currentUID: item.id
                        })
                    }
                })
            })
    }

    
    followHandler = (username) => {
        let postFollow = {
            user_id: this.state.currentUID,
            follow: username
        }
        axios.post('https://mariannas-web.herokuapp.com/api/userFavs/', postFollow)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log("there was an error posting the user", error)
            })
    }

    
    render(){
        return(
            <div className='web-card-container'>
                <div className="myWeb-box">General</div>       
                <div className="web-title">
                    <div>
                        <p>{this.props.feed.title}</p>
                        <h5 className="web-card-username">{this.props.feed['user.username']}</h5> 
                    </div> 
                </div> 
                {!this.props.feed.youTube ? '': 
                    <iframe src={"https://www.youtube.com/embed/pdszgILrTr8"} style={{ height: '240px', width: '320px'}}/>
                }
                <hr style={{width: "90%", textAlign:"center"}}/>
                <div className='web-article-content'>
                    <p>{this.props.feed.teaser}</p> 
                </div> 
                <div className='web-links'>
                    <a href={this.props.feed.link}>Visit Source</a>
                </div>
                <hr  style={{width: "90%", textAlign:"center"}}/>
                <div className="user-selectors">
                    <a onClick={() => {this.followHandler(this.props.feed['user.username'])}}>follow</a> 
                    <a>{this.props.feed.date}</a>
                    <a>push article</a>
                </div> 
                <div className='delete-button'> 
                    {localStorage.getItem('username') === process.env.REACT_APP_ADMIN_KEY ? 
                        <button style={{height:"20px", marginTop: "10px"}}onClick={() => { return this.deleteHandler(this.props.id)}}>delete</button> : ""}
                </div> 
            </div> 
        )
    }
}



