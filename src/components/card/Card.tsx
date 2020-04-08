import React, { FunctionComponent } from 'react'
import {RouteComponentProps, withRouter} from 'react-router-dom'
// styles
import './styles.scss'

type Props = {
    title: string,
    content: React.ReactNode,
    id?: string,
}

const Card:FunctionComponent<Props & RouteComponentProps> = ({id, content, title, history}) => {
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
                    <span onClick={() => history.push(`/edit-graph${id}`)}>Edit</span>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Card)