import React, { FunctionComponent, useEffect } from 'react'
// form
import {Form, Field, withFormik, FormikProps, validateYupSchema} from 'formik'
import * as Yup from 'yup'
// styles 
import '../form-parts/fields.scss'
import '../form-parts/buttons.scss'
import '../form-parts/form-container.scss'
// redux
import { ConnectedProps, connect } from 'react-redux'
import { RootState } from '../../store'
import { loginThunk, registerThunk } from '../../store/auth/thunk'
import { RouteComponentProps, Link } from 'react-router-dom'
import { store } from '../../index'
import { CleanError } from '../../store/auth/actions'

type AppDispatch = typeof store.dispatch

const mapState = (state: RootState) => ({
    isLoading: state.auth.isLoading,
    authError: state.auth.error
})

const mapDispatch = {
    loginThunk,
    registerThunk,
}

const connector = connect(mapState, mapDispatch)

type ReduxProps = ConnectedProps<typeof connector> 

// form shape
type FormValues = {
    username: string,
    password: string,
}

type Props = ReduxProps & RouteComponentProps & {
    formState?: boolean,
}

const InnerForm:FunctionComponent<Props & FormikProps<FormValues>> = ({
    formState = true,
    touched,
    errors,
    resetForm,
    isLoading,
    authError,
}) =>{
    useEffect(() =>{
        resetForm()
        store.dispatch(CleanError())
    }, [formState])

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="auth-container">

                <h1 className="title">
                    {formState ? "Login" : "Register"}  
                        {authError.length > 0
                            && <span style={{fontSize: '1rem', color: 'red'}}> - {authError}</span>
                        }
                </h1>
                <Form  className="form">
                    <label htmlFor="username" className="label">
                        Username*
                        <Field id="username" 
                            name="username"  
                            className={`field-metal ${touched.username && errors.username && ' field-error'}`}
                        />
                    </label>

                    <label htmlFor="password" className="label">
                        Password*
                        <Field id="password"
                            type="password" 
                            name="password" 
                            className={`field-metal ${touched.password && errors.password && ' field-error'}`}
                        />
                    </label>

                    <button type="submit" className={`button-metal submit-block`}>
                        {isLoading  
                            ? <p><i className="fa fa-spinner fa-spin" style={{color: 'white'}}/></p>
                            : formState ? "Login" : "Register"
                        }
                    </button>
                    {formState && 
                        <Link to="/register">{`Don't have an account? Sign up here`}</Link>
                    }
                </Form>
            </div>
        </div>
       
    )
}


const Auth = withFormik<Props, FormValues>({
    mapPropsToValues: (props) => ({
        username: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        username: Yup.string().min(6).required(),
        password: Yup.string().min(6).required(),
    }),
    handleSubmit(values, {props}){
        if(props.formState){
            props.loginThunk({username: values.username, password: values.password}, props.history)
        }else{
            // register
            props.registerThunk({username: values.username, password: values.password}, props.history)
        }
    }
})(InnerForm)

export default connector(Auth)