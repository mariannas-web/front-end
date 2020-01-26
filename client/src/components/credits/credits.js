import React from 'react'
import '../styles/credits/credits.css'

export default class Credits extends React.Component{


    render(){
        return(
            <div>
                <div className='credits-header'> 
                    <h1 className='credits-banner'>Credits</h1> 
                </div>
                <br/>
                <div className='credits'> 
                    <p className='credit'>Typewriter Icon</p>
                    <p>Created by Simon Child from Noun Project</p>
                    <br/>
                    <p className='credit'>Back Arrow Icon</p>
                    <p>Created by Evan Shuster from Noun Project</p>
                    <br/>
                    <p className='credit'>Newspaper Icon</p>
                    <p>Created by Anhair Ismail from Noun Project</p>
                    <br/>
                    <p className='credit'>Web Icon</p>
                    <p>Created by unknown From Noun Project</p>
                    <br/>
                </div> 
                <hr style={{width: '94%', border: '1px solid black', maxWidth: '300px'}} />
                <div className='disclaimer'>
                    <p>I do not own the rights to these icons and have been provided the ability to use them through the courtesy of Noun Project and the listed creators</p>
                </div>
            </div> 
        )
    }
}