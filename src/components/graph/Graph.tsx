import React, {FunctionComponent, useState} from 'react'
import Leg from '../graph-leg/Leg'


const Graph: FunctionComponent = () => {
    const [name, setName] = useState('')

    return (
        <div className="graph">
            Place for legs
            <Leg />
        </div>
    )
}

export default Graph