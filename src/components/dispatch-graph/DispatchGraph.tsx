import React, { FunctionComponent, useState } from 'react'
// styles
import './styles.scss'
// components
import Graph from '../graph/Graph'
// import GraphForm from '../graph-form/GraphForm'
import GraphForm from '../graph-forms/GraphForm'
// types
import { Graph as GraphType, Leg, DataSet} from '../../store/graph/types'

import LegForm from '../graph-forms/LegForm'


type Props = GraphType

const DispatchGraph: FunctionComponent<Props> = ({graphName, legs}) => {
    const [name, setName] = useState(graphName)
    const [arrLegs, setArrLegs] = useState(legs)
    const [datasets, setDatasets] = useState<DataSet[]>([])
    const [pointFields, setPointFields] = useState(2)


    function handleGraphName(graphName: string){
        setName(graphName)
    }

    function handleLegs(graphLegs: Leg[]){
        setArrLegs(graphLegs)
    }

    function handleDatasets(dataset: DataSet){
        setDatasets([...datasets, dataset])
    }


    return (
        <div className="dispatch-graph">   
            <Graph graphName={name} legs={arrLegs} dataSets={datasets}/>
            {/* <GraphForm 
                name={name}
                legs={arrLegs}
                datasets={datasets}
                setName={handleGraphName}
                setLegs={handleLegs}
                sendDataset={handleDatasets}
                updateDatasets={setDatasets}
            /> */}
       
             <GraphForm
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