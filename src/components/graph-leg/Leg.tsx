import React, { useState, FunctionComponent } from 'react'

type Props = {
    rotation: number,
}

const Leg: FunctionComponent<Props> = ({rotation}) => {
    const [name, setName] = useState('')

    return (
        <line x1="100" y1="0" x2="100" y2="100" transform={`rotate(${rotation}  100 100)`} />
    )
}

export default Leg


{/* <svg width="200" height="200">
<rect x="1" y="1" width="199" height="199" fill="none" stroke="grey" stroke-width="1" />
<g stroke="steelblue" stroke-width="2" stroke-linecap="round">
    <line x1="100" y1="0" x2="100" y2="100" transform="rotate(0  100 100)" />
    <line x1="100" y1="0" x2="100" y2="100" transform="rotate(72  100 100)" />
    <line x1="100" y1="0" x2="100" y2="100" transform="rotate(144  100 100)" />
    <line x1="100" y1="0" x2="100" y2="100" transform="rotate(216  100 100)" />
    <line x1="100" y1="0" x2="100" y2="100" transform="rotate(288  100 100)" />
</g>
</svg> */}