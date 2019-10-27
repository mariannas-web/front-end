import React from 'react' 
import axiosWithAuth from '../auth/utils'

export default class MyWebForm extends React.Component{
    constructor(){
        super()
        this.state = {
            title: '',
            description: '',
            link: '',
            youtube: ''
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
            title: this.state.title,
            teaser: this.state.teaser,
            link: this.state.link,
            youtube: this.state.youtube
        }
       
        axiosWithAuth().post(`${process.env.REACT_APP_POST_API_KEY}`, myWebPost)
            .then(response => {
                this.setState({
                    title: '',
                    teaser: '',
                    youTubeVideo: '',
                    link: ''
                })
            })
            .catch(error => {
                console.log("There was an error posting your content")
            })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                    <input name='title'
                           placeholder='title' 
                           value={this.state.title}
                           onChange={this.changeHandler}
                           type='text'/> 
                    <textarea name='teaser'
                              placeholder='teaser'
                              value={this.state.teaser}
                              onChange={this.changeHandler}
                              type='text' /> 
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
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}