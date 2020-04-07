import React, {FunctionComponent, useState} from 'react'
import { Leg, DataSet } from '../../store/graph/types'
import './styles.scss'

type Props = {
    legs: Leg[],
    datasets: DataSet[],
}

const GraphList:FunctionComponent<Props> = ({legs, datasets}) => {
    const [acc, setAcc] = useState({acc1: true, acc2: true})

    function closeTab(tab: keyof typeof acc){
        setAcc({...acc, [tab]: !acc[tab]})
    }   
    return (
        <>
        {
            legs.length > 0 && 
            <div className="graph-list">
                <h1 className="title">Graph parts</h1>

                <div onClick={() => closeTab('acc1')}>
                    <div className="line-header">
                        <h2 className="sub-title">Legs</h2>
                        {/* <span>&#x5e;</span> */}
                    </div>
                    
                    <div className={`content ${acc['acc1'] ? " content-open" : " "}`}>
                        <ul  className={`content-text ${acc['acc1'] ? " content-text-open" : " "}`}>
                        {legs.map((leg, index) => 
                            <li>
                                <div className="line">
                                    <span>{(index + 1) + '.  ' + leg.legName}</span>
                                    <span className="delete">—</span>
                                </div>
                                
                                <ul >
                                    {leg.points.map((point, index) => 
                                        <li className="line shift">
                                            <span>{(index + 1) + ')  ' + point.pointName}</span>
                                            <span className="delete">—</span>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        )}
                        </ul>
                    </div>
                    
                </div>
                
                {/* DATASET LIST */}
                <div onClick={() => closeTab('acc2')}>
                    <div className="line-header">
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
                                    <span className="delete">—</span>
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