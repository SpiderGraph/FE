import React, { FunctionComponent, useState, useEffect } from 'react'
// styles
import './styles.scss'
// components
import Graph from '../graph/Graph'
// import GraphForm from '../graph-form/GraphForm'
import GraphForm from '../graph-forms/GraphForm'
// types
import { Graph as GraphType, Leg, DataSet} from '../../store/graph/types'

type Props = GraphType

const DispatchGraph: FunctionComponent<Props> = ({graphName, legs}) => {
    const [name, setName] = useState(graphName)
    const [arrLegs, setArrLegs] = useState(legs)
    const [datasets, setDatasets] = useState<DataSet[]>([])
    const [pointFields, setPointFields] = useState(2)
    const [currentLeg, setCurrentLeg] = useState<number>()

    function handleLeg(leg: number){
        setCurrentLeg(leg)
    }
    useEffect(() =>{
        if(typeof currentLeg === 'number' && arrLegs[currentLeg].points.length > 0){
            setPointFields(arrLegs[currentLeg].points.length)
        }
    }, [currentLeg])

    return (
        <div className="dispatch-graph">   
            <Graph 
                graphName={name}
                legs={arrLegs} 
                dataSets={datasets} 
                handleLeg={handleLeg} 
            />       
            <GraphForm
                setCurrentLeg={setCurrentLeg}
                currentLeg={currentLeg}
                graphName={name}
                pointFields={pointFields}
                setPointFields={setPointFields}
                legs={arrLegs}
                setLegs={setArrLegs}
                datasets={datasets}
                updateDatasets={setDatasets}
            />
        </div>
    )
}

export default DispatchGraph