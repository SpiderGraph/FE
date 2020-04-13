import React, { FunctionComponent, useState, useEffect } from 'react'
import {NavLink } from 'react-router-dom'
import './styles.scss'
import Spider from '../svg/Spider'
// redux
import {connect, ConnectedProps} from 'react-redux'
import { RootState } from '../../store'
import { Logout } from '../../store/auth/actions'
import { store } from '../../index'

type AppDispatch = typeof store.dispatch

const mapState = (state: RootState) => ({
   auth: state.auth.isAuth
})

const mapDispatch = (dispatch:AppDispatch) => ({
    logout: () => {
        localStorage.removeItem("token")
        dispatch(Logout())
    }
})

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

const NavBar: FunctionComponent<PropsFromRedux> = ({
    auth,
    logout,
}) => {
    const [content, setContent] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            let w:number = window.innerWidth
            setWindowWidth(w)
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(windowWidth > 800){
            setContent(false)
        }
        if(windowWidth <= 800){
            setContent(true)
        }
    }, [windowWidth])


    return (
        <>
            <nav className={`navbar ${content ? " hide" : " "}`}>
                <div className={`center ${windowWidth > 800 ? " left " : " "}`}>
                    {auth && 
                        <>
                            <Spider position={ {x: 1, y: 1} } rotation={45} color={'white'} />
                            <NavLink exact to="/" activeClassName="selected">Graphs</NavLink>
                            <NavLink exact to="/create-graph" activeClassName="selected">Create Graph</NavLink>
                        </>
                    }
               
                {!auth && 
                    <>
                        <NavLink exact to="/login"  activeClassName="selected">Login</NavLink> 
                        <NavLink exact to="/register"  activeClassName="selected">Register</NavLink>
                    </>
                }
                 </div> 
                {auth && <NavLink to="/" onClick={() => logout()}>Logout</NavLink>}
            </nav>
            <i className="fa fa-align-justify" onClick={() => setContent(!content)}></i>
        </>
    )
}

export default connector(NavBar)