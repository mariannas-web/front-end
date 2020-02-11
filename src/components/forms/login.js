import React from 'react'
import {Link} from 'react-router-dom'
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
        axios.post(`${process.env.REACT_APP_LOGIN_API_KEY}`, loginInfo)
            .then( response => {
                console.log(response)
                this.setState({
                    username: '',
                    password: ''
                })
                localStorage.setItem('token', response.data.payload)
                localStorage.setItem('username', response.data.username)
                this.props.history.push('/myWeb')
            })
            .catch(error => { console.log('There was an error registering your content')})
    }

    
    render(){
        return(
            <div> 
                <div className='form-container'>
                    <form onSubmit={this.submitHandler}>
                        <h1>Log In</h1>
                        <input name='username' 
                               placeholder="username" 
                               type='text' 
                               onChange={this.changeHandler} 
                               value={this.state.username}/> 
    
                        <input name='password' 
                               placeholder="password" 
                               type='password' 
                               onChange={this.changeHandler} 
                               value={this.state.password}/>
    
                        <div onClick={this.submitHandler} className='button'>Submit</div> 
                    </form>
                    <hr className='form-hr' /> 
                    <h4 style={{margin: "15px 0px 5px 0px",textAlign: "center", width: "100%", color: 'white', fontWeight: '100'}}>Not A Member?</h4>
                    <div>
                        <h3><Link style={{fontSize: '18px', textDecoration: "none", color: 'white'}}to='/register'>Create New Account!</Link></h3>
                    </div> 
                </div> 
            </div> 
        )
    }
}