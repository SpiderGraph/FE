import React, { FunctionComponent, useState } from 'react'
// styles
import './styles.scss'
// components
import Graph from '../graph/Graph'
import GraphForm from '../graph-form/GraphForm'
// types
import { Graph as GraphType, Leg, DataSet} from '../../store/graph/types'

type Props = GraphType

const DispatchGraph: FunctionComponent<Props> = ({graphName, legs}) => {
    const [name, setName] = useState(graphName)
    const [arrLegs, setArrLegs] = useState(legs)
    const [datasets, setDatasets] = useState<DataSet[]>([])


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
            <GraphForm 
                name={name}
                legs={arrLegs}
                datasets={datasets}
                setName={handleGraphName}
                setLegs={handleLegs}
                sendDataset={handleDatasets}
                updateDatasets={setDatasets}
            />
        </div>
    )
}

export default DispatchGraph