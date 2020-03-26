import React, { FunctionComponent, useState } from 'react'
import Graph from './Graph'
import GraphForm from './GraphForm'
import { Graph as GraphType, Leg} from '../../store/graph/types'

type Props = GraphType

const DispatchGraph: FunctionComponent<Props> = ({graphName, legs}) => {
    const [name, setName] = useState(graphName)
    const [arrLegs, setArrLegs] = useState(legs)

    function handleGraphName(graphName: string){
        setName(graphName)
    }

    function handleLegs(graphLegs: Leg[]){
        setArrLegs(graphLegs)
    }

    return (
        <div>
            <Graph graphName={name} legs={arrLegs} />
            <GraphForm 
                name={name}
                legs={arrLegs}
                setName={handleGraphName}
                setLegs={handleLegs}
            />
        </div>
    )
}

export default DispatchGraph