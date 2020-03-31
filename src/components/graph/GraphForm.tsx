import React, { FunctionComponent, useState } from 'react'
// components
import { Leg as LegType, Graph, Point} from '../../store/graph/types'
// redux
import {connect, ConnectedProps} from 'react-redux'
import {thunkCreateGraph as createGraph} from '../../store/graph/thunk'

const mapState = null

const mapDispatch = {createGraph}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    legs: LegType[],
    name: string,
    setLegs(graphLegs: LegType[]): void,
    setName(graphName: string): void,
}

let POINTS_LIMIT = 4
let POINTS_MIN = 1

const GraphFrom: FunctionComponent<Props> = ({name, legs, setLegs, setName, createGraph}) => {
    let initPoints: Point[] = [{pointName: '', completed: false,}, {pointName: '', completed: false}]
    const [points, setPoints] = useState<Point[]>(initPoints)
    const [newLeg, setNewLeg] = useState<LegType>({legName: '', rotation: undefined, points: [] })
    const [btnDisable, setBtnDisable] = useState(1)

    function handleSubmit(){
        // format graph object and send it to the server and to the redux store
        let newGraph: Graph = {
            graphName: name,
            legs: legs,
        }
        createGraph(newGraph)
    }

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
    }


    return(
        <div className="graph-form">
            <h1 className="title">Create a new graph</h1>
            <form onSubmit={(e) => e.preventDefault()} className="form">
                <div className="fields">
                    <label htmlFor="graph-name" className="label">
                        Graph Name
                        <input id="graph-name" name="graphName" value={name} onChange={(e) => setName(e.target.value)} className="field"/>
                    </label>

                    <label htmlFor="leg-name" className="label">
                        Leg Name
                        <input id="leg-name" name="legName" value={newLeg.legName} onChange={handleLeg}  className="field"/>
                    </label>
                </div>

                <div className="fields">
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

                <div className="btns">
                    <button onClick={addPoint} className={`btn-add ${points.length >= POINTS_LIMIT && ' btn-dis'}`}>+</button>
                    <button onClick={deletePoint} className={`btn-add ${points.length <= POINTS_MIN && ' btn-dis'}`}>-</button>
                </div>

                <div className="btns">
                    <button onClick={submitLeg} className={`btn`}>ADD LEG</button>
                    <button className="btn">ADD DATASET</button>
                    <button onClick={handleSubmit} className="btn">CREATE GRAPH</button>
                </div>
            </form>
        </div>
    )
}

export default connector(GraphFrom)