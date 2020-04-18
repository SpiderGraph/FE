import React, {FunctionComponent, useState} from 'react'
import { Leg, DataSet } from '../../store/graph/types'
import './styles.scss'
import {Props as FormProps}  from '../graph-forms/LegForm';
import { generatePolygon } from '../graph-forms/dataSet';
import { GRAPH_HEIGTH } from '../graph/Graph';

type Props = {
    pointFields: number,
    setPointFields(n:number):void;

    legs: Leg[],
    setLegs(graphLegs: Leg[]): void,

    datasets: DataSet[],
    updateDatasets(dataset: DataSet[]): void,

} 

const GraphList:FunctionComponent<Props> = ({legs, datasets, setLegs, updateDatasets}) => {
    const [acc, setAcc] = useState({acc1: true, acc2: true})

    function closeTab(tab: keyof typeof acc){
        setAcc({...acc, [tab]: !acc[tab]})
    }   

    function deleteLeg(index: number){
        let filteredLegs = legs.filter((leg, i) => i !== index)
        let rotationStep:number = 360 / filteredLegs.length
        let newRotation = -rotationStep
        let updatedLegs = filteredLegs.map(item =>{
            newRotation += rotationStep
            return {...item, rotation: newRotation}
        })
        setLegs(updatedLegs) 
        if(updatedLegs.length < 3){
            updateDatasets([])
        }else{
            // modify radius and delete the item equals to leg index
            let updatedDatasets:DataSet[] = datasets.map(ds => {
                if(ds.radius && ds.radius.length > index){
                    // radius in dataset holds coords of legs, when deleting a leg appropriate item in radius should be removed
                    // delete element by the same leg index to change dataset
                    ds.radius.splice(index, 1)
                }
                    return ds   
            })
            
             // update all datasets when adding a leg
             const generateDatasets = (datasets: DataSet[], legs:Leg[]):DataSet[] => {
                return datasets.map(ds => ({...ds, points: generatePolygon(legs, ds.radius)}))
            }
            updateDatasets(generateDatasets(updatedDatasets, updatedLegs)) 
        }
    }

    function deleteDataset(index: number){
        let filteredDS = datasets.filter((ds, i) => index !== i)
        updateDatasets(filteredDS)
    }

    function deletePoint(legIndex: number, pointIndex: number){
        let halfHeight = GRAPH_HEIGTH / 2
        const generateDatasets = (datasets: DataSet[], legs:Leg[]):DataSet[] => {
            return datasets.map(ds =>{
                // if the point that needs to be deleted has a ds on it, delete ds on this leg
                if(ds.radius){
                    if(ds.radius[legIndex] === halfHeight - ((pointIndex + 1) * 63)){
                        ds.radius[legIndex] = 0
                        return ({...ds, points: generatePolygon(legs, ds.radius)})
                    }else{
                        // else reduce the ds radius 
                        ds.radius[legIndex] = ds.radius[legIndex] + 63
                        return ({...ds, points: generatePolygon(legs, ds.radius)})
                    }
                }
                // stay the same
                return ({...ds, points: generatePolygon(legs, ds.radius)})
            })
        }

        if(legs[legIndex].points.length > 1){
            let updatedPoints = legs[legIndex].points.filter((p, i) => i !== pointIndex)
            let newLegs = legs.slice()
            newLegs[legIndex].points = updatedPoints
            setLegs(newLegs)
            updateDatasets(generateDatasets(datasets, legs)) 
        }
    }

    return (
        <>
        {
            legs.length > 0 && 
            <div className="graph-list">
                <h1 className="title">Graph parts</h1>

                <div >
                    <div className="line-header" onClick={() => closeTab('acc1')}>
                        <h2>Legs</h2>
                        <i className={`fa fa-angle-down ${acc.acc1 ? " fa fa-angle-rotate" : ""}`}></i>
                    </div>
                    
                    <div className={`content ${acc['acc1'] ? " content-open" : " "}`}>
                        <ul  className={`content-text ${acc['acc1'] ? " content-text-open" : " "}`}>
                        {legs.map((leg, legIndex) => 
                            <li key={legIndex}>
                                <div className="line">
                                    <span>{(legIndex + 1) + '.  ' + leg.legName}</span>
                                    <span className="delete" onClick={() => deleteLeg(legIndex)}>—</span>
                                </div>
                                
                                <ul >
                                    {leg.points.map((point, pointIndex) => 
                                        <li key={pointIndex} className="line shift">
                                            <span>{(pointIndex + 1) + ')  ' + point.pointName}</span>
                                            <span className="delete" onClick={() => deletePoint(legIndex, pointIndex)}>—</span>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        )}
                        </ul>
                    </div>
                    
                </div>
                
                {/* DATASET LIST */}
                <div>
                    <div className="line-header" onClick={() => closeTab('acc2')}>
                        <h2 className="sub-title">Datasets</h2>
                        <i className={`fa fa-angle-down ${acc.acc2 ? " fa fa-angle-rotate" : ""}`}></i>
                    </div>
                    {
                        datasets.length > 0 && 
                        <div className={`content ${acc['acc2'] ? " content-open" : " "}`}>
                            <ul className={`content-text ${acc['acc2'] ? " content-text-open" : " "}`}>
                            {datasets.map((dataset, index )=> 
                                <li key={index} className="line">
                                    <span>{`${index + 1}.  ${dataset.dataSetName}`}</span>
                                    <span className="delete" onClick={() => deleteDataset(index)}>—</span>
                                </li>
                            )}
                            </ul>
                        </div>
                    }
                    
                </div>

            </div>
        }
        </>
    )
}

export default GraphList