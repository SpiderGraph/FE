import React, {FunctionComponent, useState} from 'react'
// styles
import './styles.scss'
// components
import Leg from '../graph-leg/Leg'
import { Graph as GraphType} from '../../store/graph/types'


type Props = GraphType

const Graph: FunctionComponent<Props> = ({graphName, legs}) => {
    const [name, setName] = useState('')
    let graphWidth = 650
    let graphHeight = 650 
    let halfWidth = graphWidth / 2
    let halfHeight = graphHeight / 2

    function poly(){
        let p = `${graphWidth / 2}, `
        legs.forEach((item, index)=>{
            // let x = x + (halfWidth) * Math.cos(angle) - (halfHeight) * Math.sin(angle) + halfWidth, y + (halfHeight) * Math.cos(angle) + (halfWidth) * Math.sin(angle) + halfHeight
            
        })
    }
   
    return (
        <div className="graph">
            <svg  height={graphHeight} width={graphWidth} viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
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

                {/* <polygon points={`
                    ${(graphHeight / 2)},${((graphHeight / 2)  - 60)}
                    ${(graphHeight) - (72 * 2)},${(graphHeight / 2) - 60}
                    ${(graphHeight) - (72 * 3)},${((graphHeight / 2) + (60 * 2))}
                    `} 
                    fill="lime" 
                    stroke="purple"
                />        */}
                 {/* <polygon points={`
                    ${(graphHeight / 2)},${(graphHeight / 2) - (60 * 2)} 
                    288,${(graphHeight / 2) - (60 * 3)}
                    216, ${(graphHeight / 2) - (60 * 2)} 144,
                    ${(graphHeight / 2) - (60 * 3)} 72,

                    ${(graphHeight / 2) - (60 * 1)} 
                    `} 
                    fill="lime" 
                    stroke="purple"
                />   
                 <polygon points={`
                    ${(graphHeight / 2)},${(graphHeight / 2) - (60 * 2)} ${(graphHeight / 2) + 72},${(graphHeight / 2) - (60 * 2)} ${(graphHeight / 2) + 144},${(graphHeight / 2) - (60 * 2)} ${(graphHeight / 2) + 216},${(graphHeight / 2) - (60 * 2)} ${(graphHeight / 2) + 288},${(graphHeight / 2) - (60 * 2)} ${(graphHeight / 2) },${(graphHeight / 2) - (60 * 2)}
`} 
                    fill="lime" 
                    stroke="purple"
                />        */}
            </svg>
        </div>
    )
}

export default Graph
