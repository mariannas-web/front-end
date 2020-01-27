import React from 'react'
import axiosWithAuth from '../auth/utils'
import '../styles/postNews/postNews.css'

export default class PostNews extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            teaser: '',
            content: '',
            youTubeVideo: '',
            link: '',
            image: '',
            source: '',
            genre: '',
        }
    }

  
    wordCount(str, max) {
        let lng = str.length;
        let deduct =  max - lng
        if(deduct === 0){
            return "stop"
        } else {
            return deduct
        }
    }

    getDate = () => {
        let currentTime = new Date()
        let month = currentTime.getMonth() + 1
        let day = currentTime.getDate()
        let year = currentTime.getFullYear()
        return month + "/" + String(day) + "/" + String(year)
    }

    changeHandler = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        const newPost = {
            title: this.state.title,
            teaser: this.state.teaser,
            content: this.state.content,
            youTubeVideo: this.state.youTubeVideo,
            link: this.state.link,
            image: this.state.image,
            source: this.state.source,
            date: this.getDate(),
            postedBy: localStorage.getItem('username'),
            genre: this.state.genre      
        }
        axiosWithAuth().post(`${process.env.REACT_APP_POST_API_KEY}`, newPost)
            .then(() => {
                this.setState({
                    title: '',
                    teaser: '',
                    content: '',
                    youTubeVideo: '',
                    link: '',
                    image: '',
                    source: '',
                    date: '',
                    postedBy: '',
                    genre: ''
                })
                this.props.history.push('/undergroundFeed')
            })
            .catch(error => { 
                console.log("There was an error posting your information", error)
            })
    }

    
    render(){
        return(
            <div className='underground-form-container input-container'>
                <h1 className='post-underground-header'>Post to Underground</h1>
                <form onSubmit={this.submitHandler}>
                    <input name='title' 
                           maxLength = '70'
                           value={this.state.title}
                           placeholder='title'
                           onChange={this.changeHandler}
                           type='text'      
                    />
                    <br/>
                    <div className='counter'>
                        {this.wordCount(this.state.title, 70)}
                    </div>     
                    <textarea name='teaser' 
                              maxLength = '225'
                              value={this.state.teaser}
                              placeholder='teaser'
                              onChange={this.changeHandler}
                              type='text'
                              id='teaser'
                              className='post-underground-textarea'
                    /> 
                    <br/>
                    <div className='counter'>
                        {this.wordCount(this.state.teaser, 225)}  
                    </div>                       
                    <br/> 
                    <input name='youTubeVideo' 
                           value={this.state.youTubeVideo}
                           placeholder='You Tube Video'
                           onChange={this.changeHandler}
                           type='text'
                    /> 
                    <br/> 
                    <input name='link' 
                           value={this.state.link}
                           placeholder='link'
                           onChange={this.changeHandler}
                           type='text'
                    /> 
                    <br/> 
                    <input name='source' 
                           value={this.state.source}
                           placeholder='source'
                           onChange={this.changeHandler}
                           type='text'
                    /> 
                    <br/> 
                    <div className='select-container'>                        
                        <h2>Select A Genre: </h2>
                        <select name='genre' 
                                value={this.state.genre}
                                placeholder='genre'
                                onChange={this.changeHandler}
                                type='text'>
                            <option value="breaking news">Breaking News</option>
                            <option value="politics">Politics</option>
                            <option value="world">World</option>
                            <option value="science">Science</option>
                            <option value="technology">Technology</option>
                            <option value="underground">Underground</option>
                            <option value="strange/weird">Strange/Weird</option>
                            <option value="business">Business</option>
                            <option value="war">War</option>
                            <option value="weather">Weather</option>
                            <option value="editorial">Editorial</option>
                            <option value="music">Music</option>
                            <option value="entertainment">Entertainment</option>
                        </select>                      
                    </div>
                    <br/> 
                    <button type='submit'>Submit</button> 
                </form>
            </div> 
        )
    }
}