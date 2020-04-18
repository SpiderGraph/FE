import React, {FunctionComponent, useState, FormEvent, ChangeEvent, useEffect} from 'react'
import './styles.scss'
import '../form-parts/fields.scss'
import '../form-parts/buttons.scss'
// redux
import {connect, ConnectedProps} from 'react-redux'
import { RootState } from '../../store'
import { filterGraphs } from '../../store/graph/actions'

const mapState = (state: RootState )=> ({
    graphs: state.graph.graphs
})

const mapDispatch = {
    filterGraphs
}

const connector = connect(mapState, mapDispatch)

type ReduxProps = ConnectedProps<typeof connector> 

const Filter:FunctionComponent<ReduxProps> = ({
    filterGraphs,
    graphs
}) => {
    const [filter, setFilter] = useState('')

    function handleSubmit(e: FormEvent){
        e.preventDefault()
        let f = new RegExp(filter, 'i')
        let newGraphs = graphs.filter(item => item.graphName.match(f))
        filterGraphs(newGraphs)
    }

    function handleFilter(e: ChangeEvent<HTMLInputElement>){
        setFilter(e.target.value)
    }

    return(
        <div className="filter">
            <form className="form" onSubmit={handleSubmit}>
                <label className="label-filter" htmlFor="filter">
                    Filter: 
                </label>
                <input id="filter" 
                    type="text" 
                    name="filter" 
                    className="field-metal" 
                    value={filter} 
                    onChange={handleFilter} 
                />
                <button type="submit" 
                    className="button-metal">
                        Search
                </button>
            </form>
        </div>
    )
}

export default connector(Filter)