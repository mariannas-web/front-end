import React from 'react' 
import axios from 'axios'

export default class DeleteFavs extends React.Component{
    constructor(){
        super();
        this.state = {
            myFavs: []
        }
    }

    componentDidMount(){
        this.renderFavs()
    }

    renderFavs = () => {
        axios.get(`${process.env.REACT_APP_USER_FAVS_API_KEY}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    myFavs: response.data
                })
            })
            .catch(error => {console.log("there was an error")})
    }

    deleteFavs = (id) => {
        axios.delete(`${process.env.REACT_APP_USER_FAVS_API_KEY}/${id}`)
            .then(response => {
                this.renderFavs()
            })
            .catch(error => {
                console.log('there was an error')
            })
    }

    render(){
        return(
            <div>
                {this.state.myFavs.map((item, key) => {
                    return <div>
                        <div>{item.follow}</div> 
                        <button onClick={() => {this.deleteFavs(item.id)}}>delete</button> 
                    </div>
                })}
            </div> 
        )
    }
}