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

let POINTS_LIMIT = 6

const GraphFrom: FunctionComponent<Props> = ({name, legs, setLegs, setName, createGraph}) => {
    const [points, setPoints] = useState<Point[]>([{pointName: '', completed: false,}, {pointName: '', completed: false}])
    const [newLeg, setNewLeg] = useState<LegType>({legName: '', rotation: undefined, points: [] })

    function handleSubmit(){
        // format graph object and send it to the server and to the redux store
        let newGraph: Graph = {
            graphName: name,
            legs: legs,
        }
        createGraph(newGraph)
        console.log('NEW GRAPH ', newGraph)
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
        let newRotation = rotationStep
        let updatedRotation = newLegs.map(item =>{
            newRotation += rotationStep
            return {...item, rotation: newRotation}
        }) // update rotation in every leg
        setLegs(updatedRotation)
        
    }


    return(
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input name="graphName" value={name} onChange={(e) => setName(e.target.value)}/>
                <input name="legName" value={newLeg.legName} onChange={handleLeg}/>
                {points.map((item,index) => 
                    <input 
                        key={index}
                        name={`point_${index}`}
                        value={item.pointName} 
                        onChange={handlePoint} />)}

                <button onClick={addPoint}>ADD POINT</button>
                <button onClick={submitLeg}>ADD LEG</button>
                <button onClick={handleSubmit}>CREATE GRAPH</button>
            </form>
        </div>
    )
}

export default connector(GraphFrom)