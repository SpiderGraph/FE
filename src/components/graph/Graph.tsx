import React, {FunctionComponent, useState} from 'react'
// styles
import './styles.scss'
// types
import { Graph as GraphType, Leg as LegType} from '../../store/graph/types'
// components
import Leg from '../graph-leg/Leg'
import Spider from '../svg/Spider'


type Props = GraphType & {
    allowDataset?: Boolean,
}
export let GRAPH_WIDTH = 650
export let GRAPH_HEIGTH = 650

const Graph: FunctionComponent<Props> = ({graphName, legs, dataSets, allowDataset = true}) => {
    const [name, setName] = useState(graphName)
    let graphWidth =  GRAPH_WIDTH
    let graphHeight = GRAPH_HEIGTH
 
  
    return (
        <div className="graph">
          {/* <h1>{name}</h1> */} 

            {(legs.length === 0) && 
                <p className="empty-graph">The place for your spider graph!</p>
            }

            {/* dataset list */}
            {(allowDataset === true)  && 
                <div style={{margin: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                    {dataSets && dataSets.length > 0 && dataSets.map(dataset => {
                        return <span style={{color: 'white', borderBottom: `5px solid ${dataset.color}`, margin: '0px 5px'}}>{dataset.dataSetName}</span>
                    })}
                </div>
             }  

            <svg  viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
                
                {dataSets && dataSets.length  > 0 && 
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

                <Spider position={ {x: graphWidth / 2 - 18, y: graphHeight / 2 - 18} } rotation={-(360 / legs.length)} color={'black'}/>
              
            </svg>

             
        </div>
    )
}

export default Graph
