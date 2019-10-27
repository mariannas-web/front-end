import React from 'react' 
import axiosWithAuth from '../auth/utils';
import MyWebCard from './myWebCard.js'
import {Link} from 'react-router-dom'



export default class MyWebCards extends React.Component{
    constructor(){
        super()
        this.state = {
            webCards: []
        }
    }

    renderPost = () => {
        axiosWithAuth().get()
            .then(response => {
                
            })
            .catch(error => {
                console.log("There was a error rendering your data")
            })
    }

    render(){
        return(
            <div>
                <Link to='/myWebForm'>Post News</Link>
                {this.state.webCards.map((item, index) => {
                    return <MyWebCard 
                                key={index} 
                                title={item.title}
                                teaser={item.teaser}
                                link={item.link}
                                youTubeVideo={item.youTubeVideo}
                           /> 
                })}
            </div>
        )
    }
}