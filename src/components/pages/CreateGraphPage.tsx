import React, { FunctionComponent } from 'react'
import Graph from '../graph/Graph'
import DispatchGraph from '../graph/DispatchGraph'

const CreateGraphPage: FunctionComponent= () => {
 
    return (
        <div>
            <DispatchGraph graphName={''} legs={[]}/>
        </div>
    )
}

export default CreateGraphPage