import React from 'react'
import axios from 'axios'

export default class Contact extends React.Component{
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
    }

    render(){
        return(
            <div>
                <form type='submit'>
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
                    <button onClick={this.submitHandler}>Submit</button>                       
                </form> 
            </div> 
        )
    }
}