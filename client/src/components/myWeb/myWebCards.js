import React from 'react' 
import axiosWithAuth from '../auth/utils';
import MyWebCard from './myWebCard.js'
import {Link} from 'react-router-dom'



export default class MyWebCards extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userData: []
        } 
    }

    componentDidMount(){
        this.renderUserData()
    }

    renderUserData = () => {
        axiosWithAuth().get(`${process.env.REACT_APP_WEB_USER_API_KEY}${this.props.userid}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    userData: response.data.userPost
                })                               
            })
            .catch(error => {console.log('There was an error posting your content')
        })
    }

    render(){
        if(!this.state.userData){return <div>Loading your content...</div>}
        return(
            <div>
                <Link to='/myWebForm'><p>Post News</p></Link>
                {this.state.userData.map((item, index) => {
                    return <MyWebCard key={index}
                                      title={item.title}
                                      teaser={item.teaser}
                                      link={item.link}
                                      youTube={item.youTubeVideo} /> 
                })}
            </div>
        )
    }
}