import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import MyWebFeedCard from './myWebFeedCard'

export default class MyWebFeedCards extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        this.renderCards()
    }

    renderCards = () => {
        axios.get('https://mariannas-web.herokuapp.com/api/userFavs')
            .then(response => {
                let myData = []
                response.data.map(item => {
                    if(item['user.username'] === localStorage.getItem('username')){
                        myData.push(item.follow)
                    }
                })
                this.renderUserPost(myData)
            })
            .catch(error => {
                console.log("there was an error rendering your data")
            })
    }

    renderUserPost = (fav) => {
        let data = []
        fav.map(favorite => {
            axios.get(`${process.env.REACT_APP_USERPOST_API_KEY}`)
                .then(response => {
                    response.data.map(item => {
                        if(item['user.username'] === favorite){
                           data.push(item)
                        }
                        this.setState({
                           data
                        })
                    })
                })
                .catch(error => {
                    console.log("There was an error", error)
                })
        })    
    }

    render(){
        if(!this.state.data){ return <div>Loading ...</div> }
        return(
            <div>
                <div>
                    <Link to='/myWeb'>Back</Link> 
                </div> 
                <div>
                    {this.state.data.map((item, index) => {
                        return <MyWebFeedCard key={index}
                                              data={item}/> 
                    })}
                </div> 
            </div>
        )
    }
}