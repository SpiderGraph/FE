import React, { FunctionComponent, useEffect } from 'react'
// styles 
import '../form-parts/fields.scss'
import '../form-parts/buttons.scss'
import '../form-parts/form-container.scss'
// form
import * as Yup from 'yup';
import {withFormik, Form, Field, FormikProps} from 'formik'
import LegForm, {Props as LegProps}  from './LegForm';
import { Graph as GraphType, Leg as LegType} from '../../store/graph/types';
// redux
import {connect, ConnectedProps} from 'react-redux'
import {thunkCreateGraph as createGraph} from '../../store/graph/thunk'
// components
import DatasetForm from './DatasetForm';
import GraphList from '../graph-list/GraphList';
// routing
import {RouteComponentProps, withRouter} from 'react-router-dom'

const mapState = null

const mapDispatch = {createGraph}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

// Shape of form values
type FormValues = {
    graphName: string
}
type ParentProps = {
    graphName: string;
}  & LegProps

type Props = PropsFromRedux & ParentProps 
type TParams =  { id: string };

const InnerForm:FunctionComponent<Props & FormikProps<FormValues> & RouteComponentProps<TParams>>  = (props) => {
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
        match
    } = props
    let id = match.params.id
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
                        {`${id ? 'UPDATE GRAPH' : 'CREATE GRAPH'}`}
                    </button>

                </Form>
                <GraphList 
                    pointFields={pointFields}
                    setPointFields={setPointFields}
                    legs={legs}
                    setLegs={setLegs}
                    datasets={datasets}
                    updateDatasets={updateDatasets}
                 />
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
        console.log('props' , props) 
        // form a graph
        let newGraph: GraphType = {
            graphName: values.graphName,
            legs: props.legs,
            dataSets: props.datasets
        }
        if(props.initialGraphName && props.initialGraphName.length > 0){
            // update graph
        }else{
            props.createGraph(newGraph)
        }
       
    }
})(withRouter(InnerForm))

export default connector(GraphForm)