import React, { FunctionComponent } from 'react'
import {NavLink } from 'react-router-dom'
import './styles.scss'
import Spider from '../svg/Spider'

const NavBar: FunctionComponent = () => {
    return (
        <nav className="navbar">
            <Spider position={ {x: 1, y: 1} } rotation={45} color={'white'} />
            <NavLink exact to="/" activeClassName="selected">Graphs</NavLink>
            <NavLink exact to="/create-graph" activeClassName="selected">Create Graph</NavLink>
        </nav>
    )
}

export default NavBar