import React from 'react'
import axios from 'axios'

export default class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
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
        
        const loginInfo = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('https://mariannas-web.herokuapp.com/api/auth/login', loginInfo)
            .then( response => {
                console.log(response)
                this.setState({
                    username: '',
                    password: ''
                })
                localStorage.setItem('token', response.data.payload)
                localStorage.setItem('username', response.data.username)
                this.props.history.push('/newsCards')
            })
            .catch(error => { console.log('There was an error registering your content')})
    }

    
    render(){
        return(
            <div className='form-container'>
                <form onSubmit={this.submitHandler}>
                    <h1>Log In</h1>
                    <input name='username' placeholder="username" type='text' onChange={this.changeHandler} value={this.state.username}/> 
                    <input name='password' placeholder="password" type='password' onChange={this.changeHandler} value={this.state.password}/>
                    <div onClick={this.submitHandler} className='button'>Submit</div> 
                </form>
            </div> 
        )
    }
}