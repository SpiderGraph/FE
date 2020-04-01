import React, { FunctionComponent, useState } from 'react'
// styles
import './styles.scss'
import '../form-parts/buttons.scss'
// components
import { Leg as LegType, Graph, Point, DataSet as DataSetType} from '../../store/graph/types'
// redux
import {connect, ConnectedProps} from 'react-redux'
import {thunkCreateGraph as createGraph} from '../../store/graph/thunk'
// utils
import { generatePolygon, generateRadius } from './dataSet'

const mapState = null

const mapDispatch = {createGraph}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    legs: LegType[],
    name: string,
    datasets: DataSetType[],
    setLegs(graphLegs: LegType[]): void,
    setName(graphName: string): void,
    sendDataset(dataset: DataSetType): void,
    updateDatasets(dataset: DataSetType[]): void,
}

let POINTS_LIMIT = 4
let POINTS_MIN = 1

const GraphFrom: FunctionComponent<Props> = ({name, legs, datasets, setLegs, setName, createGraph, sendDataset, updateDatasets}) => {
    let initPoints: Point[] = [{pointName: '', completed: false,}, {pointName: '', completed: false}]
    const [points, setPoints] = useState<Point[]>(initPoints)
    const [newLeg, setNewLeg] = useState<LegType>({legName: '', rotation: undefined, points: [] })
    const [dataset, setDataset] = useState<DataSetType>({dataSetName: '', color: '#ff0000', points: ''})

    /* Form submition */

    function handleSubmit(){
        // format graph object and send it to the server and to the redux store
        let newGraph: Graph = {
            graphName: name,
            legs: legs,
            dataSets: datasets
        }
        console.log('datasets ', datasets)
        createGraph(newGraph)
    }

    /* Points manipulation */

    function handlePoint(e: any){
        let index = e.target.name.split('_')[1]
        let new_points = points.slice()
        new_points[index] = {...new_points[index], pointName: e.target.value}
        setPoints(new_points)
    }
    
    function addPoint(e: any){
        if(points.length < POINTS_LIMIT){
            setPoints([...points, {pointName: e.target.value, completed: false}])
        }
    }

    function deletePoint(){
        if(points.length > POINTS_MIN){
            let newArr = points.slice(0, -1)
            setPoints(newArr)
        }
        
    }

    /* Legs manipulation */
    
    function handleLeg(e: any){
       setNewLeg({...newLeg, [e.target.name]: e.target.value})
    }
    
    function submitLeg(){
        // clean filled info about leg name and points
        let newLegs:LegType[] = legs.slice() // copy legs array from a parent state
        let legWithPoints = {...newLeg} // copy just craeted leg
        legWithPoints.points = points // add points to new leg
        newLegs.push(legWithPoints)  //  add a new leg to array of legs
        let rotationStep:number = 360 / newLegs.length // calculate new rotation by dividing 360 by the number of legs in the array
        let newRotation = -rotationStep
        let updatedRotation = newLegs.map(item =>{
            newRotation += rotationStep
            return {...item, rotation: newRotation}
        }) // update rotation in every leg
        setLegs(updatedRotation)
        setPoints(initPoints)

        // update all datasets when adding a leg
        updateDatasets(generateDatasets(datasets, newLegs))
    }

    /* DataSet manipulation */

    function handleDataSet(e: any){
        setDataset({...dataset, [e.targer.name]: e.targer.value})
    }

    function handleDatasetColor(e: any){
        setDataset({...dataset, color: e.target.value})
    }

    function generateDatasets(datasets: DataSetType[], legs:LegType[]):DataSetType[]{
        return datasets.map(ds => ({...ds, points: generatePolygon(legs, ds.radius)}))
    }

    function submitDataSet(){
        let points = generatePolygon(legs)
        let radius = generateRadius(legs)
        let polygon:DataSetType = {
            radius: radius,
            dataSetName: dataset.dataSetName,
            color: dataset.color,
            points: points,
        }
        sendDataset(polygon)
    }

    return(
        <div className="graph-form">
            <h1 className="title">Create a new graph</h1>
            <form onSubmit={(e) => e.preventDefault()} className="form">
                
                <div className="flex-wrap">
                    <label htmlFor="graph-name" className="label">
                        Graph Name
                        <input id="graph-name" name="graphName" value={name} onChange={(e) => setName(e.target.value)} className="field"/>
                    </label>

                    <label htmlFor="leg-name" className="label">
                        Leg Name
                        <input id="leg-name" name="legName" value={newLeg.legName} onChange={handleLeg}  className="field"/>
                    </label>
                </div>

                <div className="flex-wrap">
                    {points.map((item,index) => 
                     <label htmlFor={`point-` + index} className="label">
                        Point {index + 1}
                        <input 
                            id={`point-` + index}
                            key={index}
                            name={`point_${index}`}
                            value={item.pointName} 
                            onChange={handlePoint} 
                            className="field"
                        />
                     </label>
                    )}
                </div>

                <div className="flex-center line">
                    <button onClick={addPoint} className={`button-metal btn-add ${points.length >= POINTS_LIMIT && ' btn-dis'}`}>+</button>
                    <button onClick={deletePoint} className={`button-metal btn-add ${points.length <= POINTS_MIN && ' btn-dis'}`}>-</button>
                </div>

                <div className="flex-start block">
                    <label htmlFor="dataset-name" className="label">
                        Dataset Name
                        <input id="dataset-name" name="dataSetName" value={dataset.dataSetName} onChange={handleDataSet}  className="field"/>
                    </label>
                    <input type="color" name="color" value={dataset.color} className="color" onChange={handleDatasetColor}></input>
                    <button className="btn button-metal" onClick={submitDataSet}>ADD DATASET</button>
                </div>

                <div className="flex-center">
                    <button onClick={submitLeg} className="button-metal">ADD LEG</button>
                    <button onClick={handleSubmit} className="button-metal">CREATE GRAPH</button>
                </div>
            </form>
        </div>
    )
}

export default connector(GraphFrom)