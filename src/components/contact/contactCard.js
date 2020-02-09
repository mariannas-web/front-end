import React from 'react'

export default class ContactCard extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                {this.props.message.name}
                {this.props.message.email}
                {this.props.message.message}
            </div> 
        )
    }
}