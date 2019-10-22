import React from 'react'
import '../styles/chat/chat.css'
import axiosWithAuth from '../auth/utils';


export default class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            post: [],
            username: '',
            comments: ''
        }
    }

    componentDidMount(){
        this.loadComments()
    }

    loadComments = () => {
        axiosWithAuth().get('https://mariannas-web.herokuapp.com/api/chat')
            .then(response => {
                this.setState({
                    post: response.data.slice(-11)
                })
            })
            .catch(error => {console.log('There was an error rendering your comments')})
    }

    changeHandler = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()

        let addComment = {
            post: this.state.comments
        }

        axiosWithAuth().post('https://mariannas-web.herokuapp.com/api/chat', addComment)
            .then(response => {
                this.loadComments()
                this.setState({
                    comments: ''
                })               
            })
            .catch(error => { console.log('There was an error posting the comment')})

 
    }
    

    render(){
        if(!this.state.post.length){return <div>Loading ...</div>} 
        return(
            <div className='chat-container'>
               <div className='chat-board'>
                {this.state.post.map((item, index) => {
                    return <p key={index}>{localStorage.getItem('username')}:{item.post}</p>    
                })}
                </div>
                <form onSubmit={this.submitHandler}>
                    <input type='text' 
                           name='comments'
                           placeholder='comment'
                           value={this.state.comments}
                           onChange={this.changeHandler}/>
                    <button type='submit'>Submit</button> 
                </form>            
            </div> 
        )
    }
}