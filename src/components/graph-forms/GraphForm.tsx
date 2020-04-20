import React, { FunctionComponent, useEffect, useState} from 'react'
// styles 
import '../form-parts/fields.scss'
import '../form-parts/buttons.scss'
import '../form-parts/form-container.scss'
// form
import * as Yup from 'yup';
import {withFormik, Form, Field, FormikProps} from 'formik'
import LegForm, {Props as LegProps}  from './LegForm';
import { Graph as GraphType} from '../../store/graph/types';
// redux
import {connect, ConnectedProps} from 'react-redux'
import {thunkCreateGraph, thunkUpdateGraph} from '../../store/graph/thunk'
// components
import DatasetForm from './DatasetForm';
import GraphList from '../graph-list/GraphList';
// routing
import {RouteComponentProps, withRouter} from 'react-router-dom'
import { RootState } from '../../store';

const mapState = (state: RootState) => ({
    isLoading: state.graph.loading
})

const mapDispatch = {thunkCreateGraph, thunkUpdateGraph}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

// Shape of form values
type FormValues = {
    graphName: string
}
type ParentProps = {
    graphName: string;
}  & LegProps

type Props = PropsFromRedux & ParentProps & RouteComponentProps<TParams>
type TParams =  { id: string };

const InnerForm:FunctionComponent<Props & FormikProps<FormValues>>  = (props) => {
    const {
        pointFields,
        setPointFields,
        legs,
        setLegs,
        datasets,
        updateDatasets,
        errors,
        touched,
        currentLeg,
        setCurrentLeg,
        match,
        isLoading
    } = props
    let id = match.params.id

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
            setContent(true)
        }
        if(windowWidth <= 800){
            setContent(false)
        }
    }, [windowWidth])

    return (
        <div className="form-container">
            <h1 className="title">Create a new spider graph</h1>
                <Form className="form">
                    <label htmlFor="graph-name" className="label whole-width">
                        Graph Name
                        <Field 
                        id="graph-name" 
                        name="graphName" 
                        type="text" 
                        className={`field-metal ${touched.graphName && errors.graphName && ' field-error'}`}
                        /> 
                    </label>
                    <LegForm
                        setCurrentLeg={setCurrentLeg}
                        currentLeg={currentLeg}
                        pointFields={pointFields}
                        setPointFields={setPointFields}
                        legs={legs}
                        setLegs={setLegs}
                        datasets={datasets}
                        updateDatasets={updateDatasets}
                    />
                    <DatasetForm 
                        legs={legs}
                        datasets={datasets}
                        updateDatasets={updateDatasets}
                    />
                    <button className={`button-metal submit-block ${legs.length < 3 && ' btn-dis '}`} type="submit">
                        {isLoading 
                            ? <p><i className="fa fa-spinner fa-spin" style={{color: 'white'}}/></p>
                            : `${id ? 'UPDATE GRAPH' : 'CREATE GRAPH'}`
                        } 
                    </button>

                </Form>
                {content && 
                    <GraphList 
                        pointFields={pointFields}
                        setPointFields={setPointFields}
                        legs={legs}
                        setLegs={setLegs}
                        datasets={datasets}
                        updateDatasets={updateDatasets}
                    />
                }
                
        </div>
    )
}

type MyFormProps ={
    initialGraphName?: string
} & Props 


const GraphForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: props => ({
        graphName: props.initialGraphName || '',
    }),
    validationSchema: Yup.object().shape({
        graphName: Yup.string().required('Please enter graph name')
    }),
    handleSubmit: (values, {props}) => {
        
        let id = props.match.params.id
        // form a graph
        let newGraph: GraphType = {
            graphName: values.graphName,
            legs: props.legs,
            dataSets: props.datasets,
            date: new Date()
        }
        if(id){
            // update graph
            props.thunkUpdateGraph(id, newGraph, props.history)
        }else{
            props.thunkCreateGraph(newGraph, props.history)
        }
    }
})(InnerForm)

export default withRouter(connector(GraphForm))