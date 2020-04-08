import React, { FunctionComponent, useState, useEffect } from 'react'
// form
import * as Yup from 'yup';
import { withFormik, FormikProps, Form, Field } from 'formik';
// styles
import '../form-parts/fields.scss'
import '../form-parts/buttons.scss'
import '../form-parts/form-container.scss'
import './leg-styles.scss'
// types
import { Leg as LegType, DataSet as DataSetType, Point as PointType} from '../../store/graph/types';
// utils
import { generatePolygon} from './dataSet'


// Shape of form values
type FormValues = {
    legName: string,
    pointName1: string,
    pointName2: string,
    pointName3: string,
    pointName4: string,
}

export type Props = {
    pointFields: number,
    setPointFields(n:number):void;

    legs: LegType[],
    setLegs(graphLegs: LegType[]): void,

    datasets: DataSetType[],
    updateDatasets(dataset: DataSetType[]): void,

    currentLeg: number | undefined,
    setCurrentLeg(i: number | undefined):void,
} 

let POINTS_LIMIT = 4

function range(count:number) {
        return Array.from(Array(count).keys());
}

const InnerForm:FunctionComponent<Props & FormikProps<FormValues>> = ({
        pointFields,
        setPointFields,
        touched,
        errors,
        currentLeg,
        setFieldValue, 
        resetForm,
        legs,
        setCurrentLeg
    }) => {

    useEffect(() => {
        console.log('curent leg ', currentLeg)
        resetForm()
        if(typeof currentLeg === 'number' && legs[currentLeg].legName.length > 0){
            setFieldValue('legName', legs[currentLeg].legName)
            legs[currentLeg].points.forEach((item, index) => setFieldValue(`pointName${index + 1}`, item.pointName))
        }
    }, [currentLeg])

    function createState(){
        setCurrentLeg(undefined)
        setPointFields(2)
    }

    return (
        <>
        <div className="states-container">
            <span className={`
                update-state 
                ${typeof currentLeg === 'number' ? " update-state-active " : " btn-dis"}
            `}>
                Update state
            </span>
            <span className={`create-state ${typeof currentLeg === 'undefined' ?  " btn-dis" : ""}`}
                onClick={createState}
            >
                Create state
            </span>
        </div>
    
        <Form className="center">
            {/* leg field */}
            <label htmlFor="leg-name" className="label  whole-width">
                Leg Name
                <Field
                    id="leg-name" 
                    type="text" 
                    className={`field-metal ${touched.legName && errors.legName && ' field-error'}`}
                    name="legName" />
            </label>
            {/* point fields */}
            <div className="flex-wrap">
                {range(pointFields).map(point => 
                    <label 
                        htmlFor={`point-name`+ (point+1)} 
                        className="label"
                        style={{display: pointFields >= (point + 1) ? 'block' : 'none'}} 
                    >
                        Point {point + 1}
                        <Field 
                            id={`point-name` + (point + 1)}
                            type="text" 
                            name={`pointName`+ (point + 1)} 
                            className={`field-metal ${point + 1 === 1 && touched.pointName1 && errors.pointName1 && ' field-error'}`}
                        />
                    </label>
                )}
            </div>
            {/* increment decrement buttons */}
            <div className="flex-center">
                <button type="button"
                        onClick={() => (pointFields + 1) <= POINTS_LIMIT && setPointFields(pointFields + 1)}
                        className={`button-metal btn-add ${pointFields === POINTS_LIMIT && ' btn-dis'}`}>
                            +
                </button>
                <button type="button"
                        onClick={() => (pointFields - 1) > 0 && setPointFields(pointFields - 1)}
                        className={`button-metal btn-add ${pointFields === 1 && ' btn-dis'}`}>
                            -
                </button>
            </div>
           {/* submit */}
            <button className="btn-secondary button-metal"
                type="submit">
                    {typeof currentLeg === 'number' ? 'UPDATE LEG' : "ADD LEG"}
            </button>
        </Form>
        </>
    )
}


type MyFormProps = {
    initialLegName?: string;
    initialPointName1?: string;
    initialPointName2?: string;
    initialPointName3?: string;
    initialPointName4?: string;
} 

const LegForm = withFormik<MyFormProps & Props, FormValues>({
    mapPropsToValues: props => ({
        legName: props.initialLegName || '',
        pointName1: props.initialPointName1 || '',
        pointName2: props.initialPointName2 || '',
        pointName3: props.initialPointName3 || '',
        pointName4: props.initialPointName4 || '',
    }),
    validationSchema: Yup.object().shape({
        legName: Yup.string().required('Please enter leg name'),
        pointName1: Yup.string().required('Please enter a point name')
    }),
    handleSubmit: (values, {props}) => {

        // helper function for telling the compiler the obj argument will be a collection of string/value (string/any) pairs
        const _getKeyValue_ = (key: string) => (obj: Record<string, string>) => obj[key];
        // form points array
        let newPoints:PointType[] = range(props.pointFields).map(item => {
            let keyVal:string = _getKeyValue_(`pointName${item + 1}`)(values)
            return {
                pointName: keyVal
            }
        }).filter(item => item.pointName.length > 0)

        // form a new leg
        let newLeg:LegType = {
            legName: values.legName,
            points: newPoints,
            rotation: undefined
        }
        // copy legs array from a parent state
        let newLegs:LegType[] = props.legs.slice() 

        if(typeof props.currentLeg === 'number'){
            let rotation = newLegs[props.currentLeg].rotation
            newLeg.rotation = rotation
            newLegs[props.currentLeg] = newLeg
            props.setLegs(newLegs)
            props.setCurrentLeg(undefined)
            props.setPointFields(2)
        }else{
            //  add a new leg to array of legs
            newLegs.push(newLeg)

            // calculate new rotation by dividing 360 by the number of legs in the array
            let rotationStep:number = 360 / newLegs.length
            let newRotation = -rotationStep
            // update rotation in every leg
            let updatedLegs = newLegs.map(item =>{
                newRotation += rotationStep
                return {...item, rotation: newRotation}
                })
            // send all updated legs to parent state 
            props.setLegs(updatedLegs)

            // update all datasets when adding a leg
            const generateDatasets = (datasets: DataSetType[], legs:LegType[]):DataSetType[] => {
                return datasets.map(ds => ({...ds, points: generatePolygon(legs, ds.radius)}))
            }
            props.updateDatasets(generateDatasets(props.datasets, newLegs)) 
        }
    }
})(InnerForm)

export default LegForm