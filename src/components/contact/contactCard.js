import React from 'react'

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
                <p>{this.props.message.name}</p> 
                {this.state.messageOpen === false ? '' : 
                    <div>
                        <p>{this.props.message.email}</p>
                        <p>{this.props.message.message}</p> 
                    </div>                       
                }               
            </div> 
        )
    }
}