import React, { FunctionComponent } from 'react'
// form
import {withFormik, Form, Field, FormikProps} from 'formik'
import * as Yup from 'yup';
// types
import { DataSet as DataSetType, Leg as LegType} from '../../store/graph/types'
// utils
import { generatePolygon, generateRadius } from './dataSet'


// form shape
type FormValues = {
    dataSetName: string,
    color: string
}

type Props = {
    legs: LegType[],
    datasets: DataSetType[],
    updateDatasets(dataset: DataSetType[]): void,
}

const InnerForm:FunctionComponent<Props & FormikProps<FormValues>> = ({
    touched,
    errors,
    legs
}) =>{
    return (
        <Form className="flex-start">
            <label htmlFor="dataset-name" className="label">
                Dataset Name
                <Field
                    id="dataset-name" 
                    name="dataSetName" 
                    className={`field-metal ${touched.dataSetName && errors.dataSetName && ' field-error'}`}
                />
            </label>
            <Field 
                type="color" 
                name="color" 
                className="color" 
                style={{width: '30px', height: '30px', marginTop: '5px'}}
            />
            <button type="submit" className={`btn-secondary button-metal ${legs.length < 3 && ' btn-dis '}`}>
                Add Dataset
            </button>
        </Form>
    )
}

type FormProps = {
    initialColor?: string,
    initialDataSetName?: string,
} & Props

const DatasetForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: props => ({
        dataSetName: props.initialDataSetName || '',
        color: props.initialColor || '#ff0000'
    }),

    validationSchema: Yup.object().shape({
        dataSetName: Yup.string().required(),
    }),

    handleSubmit(values, {props}){
        let points = generatePolygon(props.legs)
        let radius = generateRadius(props.legs)
        let polygon:DataSetType = {
            radius: radius,
            dataSetName: values.dataSetName,
            color: values.color,
            points: points,
        }
        props.updateDatasets([...props.datasets, polygon])
        
    }
})(InnerForm)

export default DatasetForm

