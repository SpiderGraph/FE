import React, { FunctionComponent, useEffect, useState } from 'react'
import DispatchGraph from '../dispatch-graph/DispatchGraph'
import {useParams} from 'react-router-dom'
// redux
import {connect, ConnectedProps} from 'react-redux'
import { RootState } from '../../store'
import { Graph } from '../../store/graph/types'
import { thunkGetGraphs } from '../../store/graph/thunk'

const mapState = (state: RootState) => ({
    graphs: state.graph.graphs
})

const mapDispatch = {thunkGetGraphs}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>


const CreateGraphPage: FunctionComponent<PropsFromRedux> = ({graphs, thunkGetGraphs}) => { 
    const [graph, setGraph] = useState<Graph>()
    let { id } = useParams()

    useEffect(() => {
        if(id){
            thunkGetGraphs() 
        }
    }, [])

    useEffect(() => {
        if(id){
            let g = graphs.find(graph => graph._id === id)
            setGraph(g)
        }
    }, [graphs])

    return (
        <div>
            { id === undefined && 
                <DispatchGraph graphName={''} legs={[]}/>
            }
            { id && graph &&
                 <DispatchGraph graphName={graph.graphName} legs={graph.legs} dataSets={graph.dataSets}/>
            }
        </div>
    )
}

export default connector(CreateGraphPage)