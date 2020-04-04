import React, { FunctionComponent } from 'react'
import {RouteComponentProps, withRouter} from 'react-router-dom'
// styles
import './styles.scss'

type Props = {
    title: string,
    content: React.ReactNode,
}



const Card:FunctionComponent<Props & RouteComponentProps> = ({content, title, history}) => {
    return(
        <div className="card">
           
            <div className="card-content">
                <div className="content">
                    {content}
                </div>
            </div> 
            
            <div className="actions">
                <h1 className="title">{title}</h1>
                <div className="action-btns">
                    <span>Delete</span>
                    <span onClick={() => history.push(`/edit-graph${2}`)}>Edit</span>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Card)