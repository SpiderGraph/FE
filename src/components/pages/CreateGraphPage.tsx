import React, { FunctionComponent } from 'react'
import DispatchGraph from '../dispatch-graph/DispatchGraph'

const CreateGraphPage: FunctionComponent= () => {
 
    return (
        <div>
            <DispatchGraph graphName={''} legs={[]}/>
        </div>
    )
}

export default CreateGraphPage