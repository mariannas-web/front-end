import React from 'react'
import '../styles/contact/contactCard.css'
import axiosWithAuth from '../auth/utils';


export default class ContactCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            messageOpen: false
        }
    }

    expandHandler = () => {
        if(this.state.messageOpen === false){
            this.setState({
                messageOpen: true 
            })
        } else if (this.state.messageOpen === true){
            this.setState({
                messageOpen: false
            })
        }
    }

    deleteHandler = (id) => {
        axiosWithAuth().delete(`${process.env.REACT_APP_CONTACT}/${id}`)
            .then(response => {
                this.props.renderInfo()
            })
            .catch(error => {
                console.log("there was an error deleting the user", error)
            })
    }

    render(){
        return(
            <div className='contact-card-container' onClick={this.expandHandler}> 
                <div className='message-info'> 
                    <p>{this.props.count}</p> 
                    <p>{this.props.message.date}</p> 
                    <p>{this.props.message.name}</p> 
                    <p onClick={() => {this.deleteHandler(this.props.message.id)}} className='contact-delete-button'>Delete</p> 
                </div> 
                <div className={this.state.messageOpen === true ? 'message-open' : 'message-closed'}>
                    <p>{this.props.message.email}</p>
                    <p>{this.props.message.message}</p> 
                </div>                                               
            </div> 
        )
    }
}