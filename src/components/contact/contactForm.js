import React from 'react'
import '../styles/myWeb/myWebForm.css'
import axios from 'axios'

export default class ContactForm extends React.Component{
    constructor(){
        super()
        this.state = {
            name: '',
            email: '',
            message: ''
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
        let contactMessage = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message,
            date: this.getDate()
        }
        axios.post(`${process.env.REACT_APP_CONTACT}`, contactMessage)
            .then(response => {
                this.setState({
                    name: '',
                    email:'',
                    message:''
                })
            })
            .catch(error => {
                console.log("there was an error sending the message", error)
            })
    }

    getDate = () => {
        let currentTime = new Date()
        let month = currentTime.getMonth() + 1
        let day = currentTime.getDate()
        let year = currentTime.getFullYear()
        return month + "/" + String(day) + "/" + String(year)
    }

    render(){
        return(
            <div className='form-container'>
                <h1 id='contact-header'>Contact</h1>
                <form className='contact-form' type='submit'>
                    <input type='text'
                           placeholder='name'
                           value={this.state.name}
                           name='name'
                           onChange={this.changeHandler}
                    />
                    <input name='email'
                           placeholder='email'
                           value={this.state.email}
                           onChange={this.changeHandler}
                           type='text'
                    />
                    <textarea type='text'
                           placeholder='message'
                           value={this.state.message}
                           name='message'
                           onChange={this.changeHandler}
                    />  
                    <p className='button' onClick={this.submitHandler}>Submit</p>                       
                </form> 
            </div> 
        )
    }
}