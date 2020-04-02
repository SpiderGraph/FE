import React, { FunctionComponent } from 'react'
// styles
import './styles.scss'

type Props = {
    title: string,
    content: React.ReactNode,
}

const Card:FunctionComponent<Props> = ({content, title}) => {
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
                    <span>Edit</span>
                </div>
            </div>
        </div>
    )
}

export default Card