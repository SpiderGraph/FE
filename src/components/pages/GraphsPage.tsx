import React, { FunctionComponent, useEffect } from 'react'
// redux
import { RootState } from '../../store/index'
import {connect, ConnectedProps} from 'react-redux'
// components
import Graph from '../graph/Graph'
import Card from '../card/Card'
import { thunkGetGraphs } from '../../store/graph/thunk'
import Filter from '../filter/Filter'
import { withRouter } from 'react-router-dom'

const mapState = (state: RootState) => ({
    graphs: state.graph.filteredGraphs,
    isLoading: state.graph.loading,
})

const mapDispatch = {thunkGetGraphs}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux 

const GraphsPage: FunctionComponent<Props> = ({
    graphs, 
    thunkGetGraphs,
    isLoading
}) => {

    useEffect(() => {
        thunkGetGraphs()
    }, [])

    return (
        <>
            <Filter />
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '50px', alignItems: 'center', height: '50vh'}}>
                {(isLoading || !graphs)&&  <p><i className="fa fa-spinner fa-spin" style={{color: 'white', fontSize: '30px', margin: "auto"}}/></p>}
                {graphs && graphs.map((graph, index) =>
                    <Card 
                    key={index}
                    date={graph.date}
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