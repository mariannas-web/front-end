import React from 'react'
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
        axiosWithAuth().get('')
            .then(response => {
                this.setState({
                    post: response.data
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
            comments: this.state.comments
        }

        axiosWithAuth().post('', addComment)
            .then(response => {
                this.setState({
                    comments: ''
                })
                this.props.history.push('/chat')
            })
            .catch(error => { console.log('There was an error posting the comment')})
    }

    render(){
        return(
            <div>
                <div>{this.state.comments}</div> 
                <input type='text' 
                       name='comment'
                       placeholder='comment'
                       value={this.state.comments}
                       onChange={this.changeHandler}/>
            </div> 
        )
    }
}