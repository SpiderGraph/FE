import React, { FunctionComponent } from 'react'
import {NavLink } from 'react-router-dom'
import './styles.scss'

const NavBar: FunctionComponent = () => {
    return (
        <nav className="navbar">
            <NavLink exact to="/" activeClassName="selected">Graphs</NavLink>
            <NavLink exact to="/create-graph" activeClassName="selected">Create Graph</NavLink>
        </nav>
    )
}

export default NavBar