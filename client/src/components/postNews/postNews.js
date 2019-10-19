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
    axiosWithAuth().post('https://mariannas-web.herokuapp.com/api/post', newPost)
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
        this.props.history.push('/newsCards')
      })
      .catch(error => { 
        console.log("There was an error posting your information")
      })
  }

  render(){
    console.log(localStorage.getItem('username'))
    return(
      <div className='postNews-container'>
        <form onSubmit={this.submitHandler}>
          <input name='title' 
                 maxLength = '50'
                 value={this.state.title}
                 placeholder='title'
                 onChange={this.changeHandler}
                 type='text'      
          />
          <br/>
          <div className='counter'>
                {this.wordCount(this.state.title, 50)}
          </div>

          <textarea name='teaser' 
                    maxLength = '225'
                    value={this.state.teaser}
                    placeholder='teaser'
                    onChange={this.changeHandler}
                    type='text'
                    id='teaser'
          /> 
          <br/>
          <div className='counter'>
              {this.wordCount(this.state.teaser, 225)}  
          </div> 

          <textarea name='content' 
                    value={this.state.content}
                    placeholder='content'
                    onChange={this.changeHandler}
                    type='text'
          /> 
          
          <br/> 
          <input name='youTubeVideo' 
                 value={this.state.youTubeVideo}
                 placeholder='You Tube Video'
                 onChange={this.changeHandler}
                 type='text'
          /> 
          <br/> 
          <input name='image' 
                 value={this.state.image}
                 placeholder='image'
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
          <input name='genre' 
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