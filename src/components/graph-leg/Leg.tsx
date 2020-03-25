import React, { useState, FunctionComponent } from 'react'


const Leg: FunctionComponent = () => {
    const [name, setName] = useState('')
    return (
        <div>
            <svg height="210" width="500">
                <line x1="100" y1="100" x2="100" y2="200" className="line" />
                <line x1="100" y1="100" x2="200" y2="160" className="line" />
                <line x1="100" y1="100" x2="400" y2="140" className="line" />
                <line x1="100" y1="100" x2="600" y2="120" className="line" />
                <line x1="100" y1="100" x2="800" y2="100" className="line" />
                <line x1="100" y1="100" x2="6000" y2="80" className="line" />
            </svg>
        </div>
    )
}

export default Leg