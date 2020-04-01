import React, { FunctionComponent } from 'react'
// redux
import { RootState } from '../../store/index'
import {connect, ConnectedProps} from 'react-redux'
// components
import Graph from '../graph/Graph'

const mapState = (state: RootState) => ({
    graphs: state.graph.graphs
})

const mapDispatch = {}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux 

const GraphsPage: FunctionComponent<Props> = ({graphs}) => {
    return (
        <div>
            Graphs
            {graphs.map(graph =>
                <Graph graphName={graph.graphName} legs={graph.legs} graphId={graph.graphId} dataSets={graph.dataSets}/>
            )}
        </div>
    )
}

export default connector(GraphsPage)