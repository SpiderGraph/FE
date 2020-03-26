import React, {FunctionComponent, useState} from 'react'
import Leg from '../graph-leg/Leg'
// redux
import { RootState } from '../../store/index'
import {connect, ConnectedProps} from 'react-redux'

const mapState = (state: RootState) => ({
    graphs: state.graph.graphs
})

const mapDispatch = {}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux 

const Graph: FunctionComponent<Props> = ({graphs}) => {
    const [name, setName] = useState('')
    // devide 360 by the number of legs to get the step for rotation
   
    return (
        <div className="graph">
            Place for legs
            <p>{graphs[0].graphName}</p>
            <svg width="200" height="200">
                <g stroke="steelblue" stroke-width="2" stroke-linecap="round">
                {graphs[0].legs.map(leg =>
                    <Leg rotation={leg.rotation}/>
                )}
                </g>
            </svg>
        </div>
    )
}

export default connector(Graph)
