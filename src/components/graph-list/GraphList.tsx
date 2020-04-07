import React, {FunctionComponent, useState} from 'react'
import { Leg, DataSet } from '../../store/graph/types'
import './styles.scss'
import {Props as FormProps}  from '../graph-forms/LegForm';

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
        }
    }

    function deleteDataset(index: number){
        let filteredDS = datasets.filter((ds, i) => index !== i)
        updateDatasets(filteredDS)
    }

    function deletePoint(legIndex: number, pointIndex: number){
        if(legs[legIndex].points.length > 1){
            let updatedPoints = legs[legIndex].points.filter((p, i) => i !== pointIndex)
            let newLegs = legs.slice()
            newLegs[legIndex].points = updatedPoints
            setLegs(newLegs)
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
                        <h2 className="sub-title">Legs</h2>
                        {/* <span>&#x5e;</span> */}
                    </div>
                    
                    <div className={`content ${acc['acc1'] ? " content-open" : " "}`}>
                        <ul  className={`content-text ${acc['acc1'] ? " content-text-open" : " "}`}>
                        {legs.map((leg, legIndex) => 
                            <li>
                                <div className="line">
                                    <span>{(legIndex + 1) + '.  ' + leg.legName}</span>
                                    <span className="delete" onClick={() => deleteLeg(legIndex)}>—</span>
                                </div>
                                
                                <ul >
                                    {leg.points.map((point, pointIndex) => 
                                        <li className="line shift">
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
                        {/* <span>&#x5e;</span> */}
                    </div>
                    {
                        datasets.length > 0 && 
                        <div className={`content ${acc['acc2'] ? " content-open" : " "}`}>
                            <ul className={`content-text ${acc['acc2'] ? " content-text-open" : " "}`}>
                            {datasets.map((dataset, index )=> 
                                <li className="line">
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