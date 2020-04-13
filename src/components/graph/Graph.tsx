import React, {FunctionComponent, useState} from 'react'
// styles
import './styles.scss'
// types
import { Graph as GraphType, Leg as LegType} from '../../store/graph/types'
// components
import Leg from '../graph-leg/Leg'
import Spider from '../svg/Spider'


type Props = GraphType & {
    signleView?: boolean,
    handleLeg?: (leg: number) => void
}
export let GRAPH_WIDTH = 650
export let GRAPH_HEIGTH = 650

const Graph: FunctionComponent<Props> = ({
    graphName,
    legs, 
    dataSets, 
    signleView = true,
    handleLeg
    }) => {
    const [name, setName] = useState(graphName)
    const [showDS, setShowDS] = useState(dataSets && new Array(dataSets.length).fill(true))
    let graphWidth =  GRAPH_WIDTH
    let graphHeight = GRAPH_HEIGTH
 
    function setLeg(leg: number):void{
        if(handleLeg){
            handleLeg(leg)
        }
    }

    function hideDS(i: number){
        if(showDS){
            let ds = showDS.slice()
            ds[i] = !ds[i]
            setShowDS(ds)
        } 
    }

  
    return (
        <div className={`graph ${signleView ? '' : 'point'}`}>

            {(legs.length === 0) && 
                <p className="empty-graph">The place for your spider graph!</p>
            }

            {/* dataset list */}
            {(signleView === true)  && 
                <div className={`ds-list`}>
                    {dataSets && dataSets.length > 0 && dataSets.map((dataset, index) => {
                        return <span key={index}
                                     onClick={() => hideDS(index)}
                                     className={`${showDS && showDS[index] ? '' : 'ds-cross'}`}
                                     style={{color: 'white', borderBottom: `5px solid ${dataset.color}`, margin: '0px 5px'}}>
                                    {dataset.dataSetName}
                               </span>
                    })}
                </div>
             }  

            <svg  viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
                
                {dataSets && dataSets.length  > 0 && 
                    dataSets.map((dataset, index) => {
                        if(showDS && showDS[index]){
                              return <polygon key={index} points={dataset.points} fill={dataset.color} opacity="0.3"></polygon>
                        }
                    })
                }

                <g>
                {legs.map((leg, index) =>
                <a   key={index} style={{display: 'block'}} onClick={() => setLeg(index)}>
                     <Leg
                            signleView={signleView}
                            rotation={leg.rotation}
                            legName={leg.legName}
                            points={leg.points} 
                            graphParams={{width: graphWidth, height: graphHeight}}  
                        />
                </a>
                       
                )}
                </g>
                
                <circle cx={graphWidth / 2} cy={graphHeight / 2} r={18} fill="#C4C4C4" style={{zIndex: 5}}/>

                <Spider position={ {x: graphWidth / 2 - 18, y: graphHeight / 2 - 18} } rotation={-(360 / legs.length)} color={'black'}/>
              
            </svg>

             
        </div>
    )
}

export default Graph
