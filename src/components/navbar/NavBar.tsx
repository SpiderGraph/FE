import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const NavBar: FunctionComponent = () => {
    return (
        <nav>
            <Link to="/">Graphs</Link>
            <Link to="/create-graph">Create Graph</Link>
        </nav>
    )
}

export default NavBar