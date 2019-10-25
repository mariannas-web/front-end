import React from 'react'
import axios from 'axios'
import './newsCard.css'


export default class NewsCard extends React.Component{
  constructor(props){
    super(props)
  }


  deleteHandler = (id) => {
      axios.delete(`${process.env.REACT_APP_DELETE_API_KEY}/${id}`)
          .then(response => {
              console.log('the user has been deleted')
              window.location.reload()
          })
          .catch(error => {console.log("There was an error deleting the user")})
  }

  render(){
    return(
      <div className='card-container'>
        <div className="title">
          <p>{this.props.card.title}</p>
        </div> 
        <div className= 'article-image' >
          <img className='newsCard-image' src={this.props.card.image} />
        </div> 
        <div className='article-content'>
          <p>{this.props.card.teaser}</p> 
        </div> 
        <hr  style={{width: "90%", textAlign:"center"}}/> 
        <div className='links'>
          <a href={this.props.card.source}>Source</a> 
          <p>{this.props.card.date}</p>
          <p>{this.props.card.postedBy}</p> 
        </div>
        <div className='delete-button'> 
            {localStorage.getItem('username') === process.env.REACT_APP_ADMIN_KEY ? 
                <button onClick={() => { return this.deleteHandler(this.props.card.id)}}>delete</button> : ""}
        </div> 
      </div> 
    )
  }
}

