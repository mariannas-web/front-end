import React from 'react'

export default class MyWebFeedCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='web-card-container'>
            <div className="myWeb-box">General</div> 
                <div className="web-title">
                   <div>
                    <p>{this.props.data.title}</p>
                    <h5 className="web-card-username">{this.props.data['user.username']}</h5> 
                   </div> 
                </div> 
                {!this.props.data.youTube ? '': 
                    <iframe src={"https://www.youtube.com/embed/pdszgILrTr8"} style={{ height: '240px', width: '320px'}}/>
                }
                <hr style={{width: "90%", textAlign:"center"}}/>
                <div className='web-article-content'>
                    <p>{this.props.data.teaser}</p> 
                </div> 
                <div className='web-links'>
                    <a href={this.props.data.link}>Visit Source</a>
                </div>
                <hr  style={{width: "90%", textAlign:"center"}}/>
                <div className="user-selectors">
                    <a>follow</a> 
                    <a>{this.props.data.date}</a>
                    <a>push article</a>
                </div> 
                <div className='delete-button'> 
                    {localStorage.getItem('username') === process.env.REACT_APP_ADMIN_KEY ? 
                        <button style={{height:"20px", marginTop: "10px"}} onClick={() => { return this.deleteHandler(this.props.id)}}>delete</button> : ""}
                </div> 
            </div> 
        )
    }
}