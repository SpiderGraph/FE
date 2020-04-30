import React, {FunctionComponent} from 'react'
import {Route, Redirect, RouteProps} from 'react-router-dom'
import { store } from "../index";

type Props = {
    // component: typeof React.Component; // new() => React.Component
} & RouteProps

const PrivateRoute: FunctionComponent<Props> = ({ children, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={
                props => 
                !!localStorage.getItem("token") && store.getState().auth.isAuth
                    ? children
                    : <Redirect 
                        to={{
                            pathname: "/login",
                            state: {from: props.location}
                        }} 
                      />
            }
        />
    )
}

export default PrivateRoute