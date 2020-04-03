import React, { FunctionComponent, useState } from 'react'
// form
import * as Yup from 'yup';
import { withFormik, FormikProps, Form, Field } from 'formik';
// styles
import '../form-parts/fields.scss'
import '../form-parts/buttons.scss'
// types
import { Leg as LegType, DataSet as DataSetType, Point as PointType} from '../../store/graph/types';

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
} 

let POINTS_LIMIT = 4

function range(count:number) {
        return Array.from(Array(count).keys());
}

const InnerForm:FunctionComponent<Props & FormikProps<FormValues>> = ({
        pointFields,
        setPointFields,
    }) => {
    
    function handlePoints(count:number){
        if(pointFields > 0 && count <= POINTS_LIMIT){
            setPointFields(count)
        }
    }

    return (
        <Form>
            {/* leg field */}
            <label htmlFor="leg-name" className="label">
                Leg Name
                <Field
                    id="leg-name" 
                    type="text" 
                    className="field-metal"
                    name="legName" />
            </label>
            {/* point fields */}
            <div className="flex-wrap">
                {range(POINTS_LIMIT).map(point => 
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
                            className="field-metal"
                        />
                    </label>
                )}
            </div>
            {/* increment decrement buttons */}
            <div className="flex-center">
                <button type="button"
                        onClick={() => handlePoints(pointFields + 1)}
                        className={`button-metal btn-add ${pointFields >= POINTS_LIMIT && ' btn-dis'}`}>
                            +
                </button>
                <button type="button"
                        onClick={() => handlePoints(pointFields - 1)}
                        className={`button-metal btn-add ${pointFields >= POINTS_LIMIT && ' btn-dis'}`}>
                            -
                </button>
            </div>
           {/* submit */}
            <button className="btn button-metal" type="submit">
                ADD LEG
            </button>
        </Form>
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
        })
        // form a new leg
        let newLeg:LegType = {
            legName: values.legName,
            points: newPoints,
            rotation: undefined
        }
        // copy legs array from a parent state
        let newLegs:LegType[] = props.legs.slice() 
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
    }
})(InnerForm)

export default LegForm