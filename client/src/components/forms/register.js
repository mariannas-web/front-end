import React from 'react'
import '../styles/forms/form.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class RegisterForm extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
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
        
        const newPost = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        console.log(newPost)
        axios.post('https://mariannas-web.herokuapp.com/api/auth/register', newPost)
            .then( response => {
                console.log(response)
                this.setState({
                    username: '',
                    email: '',
                    password: ''
                })
                this.props.history.push('/login')
            })
            .catch(error => { console.log('There was an error registering your content')})
    }

    
    render(){
        return(
            <div className='form-container'>
                <form onSubmit={this.submitHandler}>
                    <h1>Sign Up</h1> 
                    <input name='username' 
                           placeholder="username" 
                           type='text' 
                           onChange={this.changeHandler} 
                           value={this.state.username}/> 
                    <input name='email' 
                           placeholder="email" 
                           type='text' 
                           onChange={this.changeHandler} 
                           value={this.state.email}/>
                    <input name='password' 
                           placeholder="password" 
                           type='password' 
                           onChange={this.changeHandler} 
                           value={this.state.password}/>
                    <div className='button' onClick={this.submitHandler}> Submit</div> 
                </form>
                <p style={{textAlign: 'center', fontSize:'23px', textShadow: 'none'}}>Already a member? Sign in <Link to='login'>here</Link></p>
            </div> 
        )
    }
}