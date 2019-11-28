import React from 'react' 
import axiosWithAuth from '../auth/utils'
import '../styles/myWeb/myWebForm.css'

export default class MyWebForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            teaser: '',
            link: '',
            youtube: ''
        }
    }

    getDate = () => {
        let currentTime = new Date()
        let month = currentTime.getMonth() + 1
        let day = currentTime.getDate()
        let year = currentTime.getFullYear()
        return month + "/" + String(day) + "/" + String(year)
    }

    wordCount(str, max) {
        let lng = str.length;
        let deduct =  max - lng
        if(deduct === 0){
          return "Limit Reached"
        } else {
        return deduct
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

        const myWebPost = {
            user_id: this.props.userid,
            title: this.state.title,
            teaser: this.state.teaser,
            link: this.state.link,
            youTubeVideo: this.state.youtube,
            date: this.getDate()
        }
        
        console.log(myWebPost)
        axiosWithAuth().post(`${process.env.REACT_APP_USERPOST_API_KEY}`, myWebPost)
            .then(() => {
                this.props.history.push('/myWeb')
            })
            .catch(error => {
                console.log("There was an error posting your content")
            })
    }

    render(){
        return(
            <div className='myWeb-form-container'>
                <h1>Post News</h1>
                <form onSubmit={this.submitHandler}>
                    <input name='title'
                           placeholder='title' 
                           maxLength='50'
                           value={this.state.title}
                           onChange={this.changeHandler}
                           type='text'/> 
                    <div className='counter'>
                        {this.wordCount(this.state.title, 50)}
                    </div>
                    <textarea name='teaser'
                              placeholder='teaser'
                              maxLength='225'
                              value={this.state.teaser}
                              onChange={this.changeHandler}
                              type='text' /> 
                    <div className='counter'>
                        {this.wordCount(this.state.teaser, 225)}
                    </div>
                    <input name='link'
                           placeholder='link'
                           value={this.state.link}
                           onChange={this.changeHandler}
                           type='text'/>
                    <input name='youtube'
                           placeholder='youtube'
                           value={this.state.youTubeVideo}
                           onChange={this.changeHandler}
                           type='text'/> 
                    <p onClick={this.submitHandler}>Submit</p>
                </form>
            </div>
        )
    }
}