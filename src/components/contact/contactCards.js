import React from 'react'
import axiosWithAuth from '../auth/utils';
import ContactCard from './contactCard'
import '../styles/contact/contactCards.css'

export default class ContactCards extends React.Component{
    constructor(){
        super();
        this.state = {
            contactInfo: []
        }
    }

    componentDidMount(){
        this.renderInfo()
    }

    renderInfo = () => {
        axiosWithAuth().get(`${process.env.REACT_APP_CONTACT}`)
            .then(response => {
                this.setState({
                    contactInfo: response.data
                })
            })
            .catch(error => {
                console.log('There was an error retrieving your messages', error)
            })
    }

    render(){
        if(!this.state.contactInfo.length){
            return 'loading your messages'
        }
        return(
            <div className='contact-cards'>
                <p>You currently have {this.state.contactInfo.length} messages!</p>
                {this.state.contactInfo.map((item, index) => {
                    return <ContactCard message={item}
                                        key={index}
                                        count={index}
                                        renderInfo={this.renderInfo}
                           />
               })}
               <p>You currently have {this.state.contactInfo.length} messages!</p>
            </div> 
        )
    }
}