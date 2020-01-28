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
        axios.post(`${process.env.REACT_APP_REGISTER_API_KEY}`, newPost)
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
            <div>
                <p style={{fontSize:"34px", margin: "10px 0px", textAlign: 'center', fontWeight: "bold", fontFamily: "'Alegreya Sans', 'serif'"}}> Marianna's Web </p>
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
                    <hr className='form-hr'/>
                    <h4 style={{margin: "5px 0px"}}>Already A Member?</h4>
                    <h3 className='sign-in-button'><Link style={{textDecoration: 'none', color: 'white'}} to='login'> Sign In Here</Link></h3>
                </div> 
            </div>
        )
    }
}