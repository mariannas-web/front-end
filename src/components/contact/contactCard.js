import React from 'react'
import '../styles/contact/contactCard.css'

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

    render(){
        return(
            <div onClick={this.expandHandler}> 
                <div className='message-info'> 
                    <p>{this.props.count}</p> 
                    <p>{this.props.message.date}</p> 
                    <p>{this.props.message.name}</p> 
                </div> 
                <div className={this.state.messageOpen === true ? 'message-open' : 'message-closed'}>
                    <p>{this.props.message.email}</p>
                    <p>{this.props.message.message}</p> 
                </div>                       
                              
            </div> 
        )
    }
}