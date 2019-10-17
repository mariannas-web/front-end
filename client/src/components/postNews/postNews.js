import React from 'react'
import axios from 'axios'
import '../styles/postNews/postNews.css'

export default class PostNews extends React.Component{
  constructor(){
    super();

    this.state = {
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
    }
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
      date: this.state.date,
      postedBy: this.state.postedBy,
      genre: this.state.genre      
    }
    axios.post('https://mariannas-web.herokuapp.com/api/post', newPost)
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
      })
      .catch(error => { 
        console.log("There was an error posting your information")
      })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.submitHandler}>
          Title:<input name='title' 
                 value={this.state.title}
                 placeholder='title'
                 onChange={this.changeHandler}
                 type='text'
                /> 
                <br/>
          Teaser:<textarea name='teaser' 
                 value={this.state.teaser}
                 placeholder='teaser'
                 onChange={this.changeHandler}
                 type='text'
                /> 
                <br/>
          Content:<textarea name='content' 
                 value={this.state.content}
                 placeholder='content'
                 onChange={this.changeHandler}
                 type='text'
                /> 
                <br/> 
          YouTube Video:<input name='youTubeVideo' 
                 value={this.state.youTubeVideo}
                 placeholder='You Tube Video'
                 onChange={this.changeHandler}
                 type='text'
                /> 
                <br/> 
          Link:<input name='link' 
                 value={this.state.link}
                 placeholder='link'
                 onChange={this.changeHandler}
                 type='text'
                /> 
                <br/> 
          Image<input name='image' 
                 value={this.state.image}
                 placeholder='image'
                 onChange={this.changeHandler}
                 type='text'
                /> 
                <br/> 
          Source<input name='source' 
                 value={this.state.source}
                 placeholder='source'
                 onChange={this.changeHandler}
                 type='text'
                /> 
                <br/> 
          Date<input name='date' 
                 value={this.state.date}
                 placeholder='date'
                 onChange={this.changeHandler}
                 type='text'
                /> 
                <br/> 
          postedBy<input name='postedBy' 
                 value={this.state.postedBy}
                 placeholder='posted by'
                 onChange={this.changeHandler}
                 type='text'
                /> 
                <br/> 
          Genre<input name='genre' 
                 value={this.state.genre}
                 placeholder='genre'
                 onChange={this.changeHandler}
                 type='text'
                />
                <br/> 
          <button type='submit'>Submit</button> 
        </form>
      </div> 
    )
  }
}