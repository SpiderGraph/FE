import React, {FunctionComponent, useState} from 'react'
import Leg from '../graph-leg/Leg'
import { Graph as GraphType} from '../../store/graph/types'

type Props = GraphType

const Graph: FunctionComponent<Props> = ({graphName, legs}) => {
    const [name, setName] = useState('')
    // devide 360 by the number of legs to get the step for rotation
   
    return (
        <div className="graph">
            <svg width="200" height="200">
                <g stroke="steelblue" strokeWidth="2" strokeLinecap="round">
                {legs.map((leg, index) =>
                    <Leg key={index} rotation={leg.rotation} legName={'ex'} points={leg.points}/>
                )}
                </g>
            </svg>
        </div>
    )
}

export default Graph
