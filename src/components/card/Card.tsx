import React, { FunctionComponent } from 'react'
import {RouteComponentProps, withRouter} from 'react-router-dom'
// styles
import './styles.scss'
// redux
import {connect, ConnectedProps} from 'react-redux'
import { thunkDeleteGraph } from '../../store/graph/thunk'

const mapState = null
const mapDispatch = {
    thunkDeleteGraph
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = {
    title: string,
    content: React.ReactNode,
    id?: string,
} & PropsFromRedux

const Card:FunctionComponent<Props & RouteComponentProps> = ({
        id, 
        content, 
        title, 
        history,
        thunkDeleteGraph
    }) => {

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
                    <span onClick={() => thunkDeleteGraph(id || '')}>Delete</span>
                    <span onClick={() => history.push(`/edit-graph${id}`)}>Edit</span>
                </div>
            </div>
        </div>
    )
}

export default withRouter(connector(Card))