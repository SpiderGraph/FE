import React, { FunctionComponent, useEffect } from 'react'
// redux
import { RootState } from '../../store/index'
import {connect, ConnectedProps} from 'react-redux'
// components
import Graph from '../graph/Graph'
import Card from '../card/Card'
import { thunkGetGraphs } from '../../store/graph/thunk'

const mapState = (state: RootState) => ({
    graphs: state.graph.graphs
})

const mapDispatch = {thunkGetGraphs}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux 

const GraphsPage: FunctionComponent<Props> = ({graphs, thunkGetGraphs}) => {

    useEffect(() => {
        thunkGetGraphs()
    }, [])

    return (
        <>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '50px'}}>
                {graphs.map((graph, index) =>
                    <Card 
                    key={index}
                    id={graph._id}
                    title={graph.graphName}
                    content={
                        <Graph graphName={graph.graphName}
                            signleView={false}
                            legs={graph.legs}
                            dataSets={graph.dataSets}/>}>
                    </Card>
                )}
            </div>
        </>
    )
}

export default connector(GraphsPage)