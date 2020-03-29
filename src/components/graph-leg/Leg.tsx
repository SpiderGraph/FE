import React, { useState, FunctionComponent } from 'react'
// styles
import './styles.scss'
// components
import { Leg as LegType } from '../../store/graph/types'


type Props = LegType & {
    graphParams: {
        width: number,
        height: number,
    }
}

const Leg: FunctionComponent<Props> = ({rotation = 30, points, graphParams, legName}) => {
    const [name, setName] = useState('')
    let xAxis = graphParams.width / 2
    let yAxis = graphParams.height / 2

    let step = 60 // distance between points
    let radius = 5 // radius of the circle
    let position = xAxis // position for points, the bigger is number the closer is a point

    return (
        <g transform={`rotate(${rotation}  ${xAxis} ${yAxis})`}>
            {points.map((item, index) => {
                position -= 60 // decrement the position to ship point
            return(
                <g>
                    <line x1={xAxis} y1={position} x2={xAxis} y2={position + step - radius} 
                        stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" 
                    />
                    <text x={xAxis + 5} y={position - 10} transform={`rotate(-${rotation} ${xAxis} ${position})`} className="svg-font">
                        {item.pointName.length > 0 ? item.pointName : 'Point'}
                    </text>
                    <circle cx={xAxis} cy={position} r={radius} fill="#C4C4C4" /> 
                </g>
            )
           })}
           <text x={xAxis - 20} y={position - 50} transform={`rotate(-${rotation} ${xAxis - 5} ${position - 50})`} className="svg-title">
                {legName}
            </text>
        </g>
    )
}

export default Leg
