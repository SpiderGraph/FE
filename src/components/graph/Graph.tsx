import React, {FunctionComponent, useState} from 'react'
// styles
import './styles.scss'
// components
import Leg from '../graph-leg/Leg'
import { Graph as GraphType, Leg as LegType} from '../../store/graph/types'
import { reverse } from 'dns'


type Props = GraphType

const Graph: FunctionComponent<Props> = ({graphName, legs}) => {
    const [name, setName] = useState('')
    let graphWidth = 650
    let graphHeight = 650 
    let halfWidth = graphWidth / 2
    let halfHeight = graphHeight / 2
    let coords:number[] = []

    function pts(sideCount:number, radius:number[]) {
        const angle = 360 / sideCount;
        const vertexIndices = range(sideCount);
        const offsetDeg = 90 - ((180 - angle) / 2);
        const offset = degreesToRadians(offsetDeg);
      
        return vertexIndices.map((index) => {
          return {
            // theta: offset + degreesToRadians(angle * index),
            theta: degreesToRadians(-angle * index),
            r: radius[index],
          };
        });
      }

      function range(count:number) {
        return Array.from(Array(count).keys());
      }
      
      function degreesToRadians(angleInDegrees:number) {
        // (Math.PI * angleInDegrees) / 180;
        return (Math.PI / 180) * angleInDegrees;
      }
    
    function polygon([cx, cy]:[number,number], sideCount:number, radius:number[]) {
        return pts(sideCount, radius)
          .map(({ r, theta }) => [
            // cy + r * Math.sin(theta),
            // cx + r * Math.cos(theta),

            (Math.cos(theta) * (halfWidth - cx)) + (Math.sin(theta) * (r - cy)) + cx,
            (Math.cos(theta) * (r - cy)) - (Math.sin(theta) * (halfWidth - cx)) + cy,

            // cx + r * Math.cos(theta),
            // cy + r * Math.sin(theta),
          ])
          .join(' '); 
      }

    function generatePolygon(legs:LegType[]) {
        const sideCount = legs.length
        const radius:number[] = generateRadius(legs)

        const cx = halfWidth 
        const cy = halfHeight
        // const s = 2 * radius + 50;
    
        const viz = polygon([cx, cy], sideCount, radius);
        console.log('VIZ ',viz)
        return viz
    }

    function generateRadius(legs:LegType[]){
        return legs.map(item =>{
            return halfHeight - (item.points.length * 63)
        })
    }
  
    return (
        <div className="graph">
            <svg  height={graphHeight} width={graphWidth} viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
                {/* {legs.length > 0 &&  <polygon points={`${generatePolygon(legs)}`} transform='rotate(234 325 325)'></polygon>} */}
                {legs.length > 0 &&  <polygon points={`${generatePolygon(legs)}`}></polygon>}
               
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
