import React, {FunctionComponent, useState} from 'react'
// styles
import './styles.scss'
// types
import { Graph as GraphType, Leg as LegType} from '../../store/graph/types'
// components
import Leg from '../graph-leg/Leg'


type Props = GraphType
export let GRAPH_WIDTH = 650
export let GRAPH_HEIGTH = 650

const Graph: FunctionComponent<Props> = ({graphName, legs, dataSets}) => {
    const [name, setName] = useState(graphName)
    let graphWidth =  GRAPH_WIDTH
    let graphHeight = GRAPH_HEIGTH
 
  
    return (
        <div className="graph">
          <h1>{name}</h1>
            <svg  height={graphHeight} width={graphWidth} viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
                {dataSets && dataSets.length > 0 && 
                dataSets.map(dataset => {
                  return <polygon points={dataset.points} fill={dataset.color} opacity="0.3"></polygon>
                })
                }
                <g>
                {legs.map((leg, index) =>
                    <Leg key={index} 
                        rotation={leg.rotation}
                        legName={leg.legName}
                        points={leg.points} 
                        graphParams={{width: graphWidth, height: graphHeight}}
                    />
                )}
                </g>


                <circle cx={graphWidth / 2} cy={graphHeight / 2} r={18} fill="#C4C4C4" style={{zIndex: 5}}/>
            </svg>
        </div>
    )
}

export default Graph
