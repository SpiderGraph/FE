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

    function poly(){
        let p = `${graphWidth / 2}, `
        legs.forEach((item, index)=>{
            let l = graphHeight - (item.points.length * 60)
            
        })
    }
   
    return (
        <div className="graph">
            <svg  height={graphHeight} width={graphWidth}>
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

                {/* <polygon points={`${graphWidth / 2},60 470, 190 430, 300 40, 440 100, 200 50, 210`} fill="lime" stroke="purple"/>        */}
            </svg>
        </div>
    )
}

export default Graph
