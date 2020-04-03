import React, { FunctionComponent } from 'react'
// styles 
import '../form-parts/fields.scss'
import '../form-parts/buttons.scss'
// form
import * as Yup from 'yup';
import {withFormik, Form, Field, FormikProps} from 'formik'
import LegForm, {Props as LegProps}  from './LegForm';
import { Graph } from '../../store/graph/types';
// redux
import {connect, ConnectedProps} from 'react-redux'
import {thunkCreateGraph as createGraph} from '../../store/graph/thunk'

const mapState = null

const mapDispatch = {createGraph}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

// Shape of form values
type FormValues = {
    graphName: string
}

type Props = {
    graphName: string;
} & LegProps

const InnerForm:FunctionComponent<Props & FormikProps<FormValues> & PropsFromRedux> = ({
    pointFields,
    setPointFields,
    legs,
    setLegs,
    datasets,
    updateDatasets,
}) => {
    return (
        <Form>
            {/* {console.log('FIST ', props)} */}
             <label htmlFor="graph-name" className="label">
                 Graph Name
                <Field 
                    id="graph-name" 
                    name="graphName" 
                    type="text" 
                    className="field-metal"
                /> 
            </label>
            <LegForm 
                pointFields={pointFields}
                setPointFields={setPointFields}
                legs={legs}
                setLegs={setLegs}
                datasets={datasets}
                updateDatasets={updateDatasets}
            />
            <button className="btn button-metal" type="submit">
                CREATE GRAPH
            </button>
        </Form>
    )
}

type FormProps = {
    initialGraphName?: string
}

const GraphForm = withFormik<FormProps & Props, FormValues>({
    mapPropsToValues: props => ({
        graphName: props.initialGraphName || '',
    }),
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, props) => {
        console.log('PROPS ', props)
        // form a graph
        // let newGraph: Graph = {
        //     graphName: values.graphName,
        //     legs: props.legs,
        // }
        // createGraph(newGraph)
    }
})(connector(InnerForm))

export default GraphForm