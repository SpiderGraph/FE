import React, { FunctionComponent } from 'react'
import './home.scss'
import '../form-parts/buttons.scss'
import {History} from 'history'

type Props = {
    history: History 
}

const HomePage: FunctionComponent<Props> = ({history}) => {
    return(
        <div className="home-page">
            {console.log('PROPS ', history)}
            <div className="section">
                <h2 className="title">
                    visualizer for your 
                    <span>  business goals</span>, 
                    <span>  initiatives</span>, 
                    <span>  timelines</span>, and  
                    <span>  progress</span>
                </h2>
                <p className="secondary-text">
                    express all the ideas you’re going to tackle with Spider Graph                
                </p>   
                <div className="section-row"> 
                    <button className="button-metal" onClick={() => history.push('/login')}>Login</button>
                    <button className="button-metal" onClick={() => history.push('/register')}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage