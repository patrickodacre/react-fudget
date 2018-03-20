import React from 'react'
import { Link } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import ListGroupItem from './ListGroupItem'
import numeral from 'numeral'
import moment from 'moment'

export default props => {
    const { groups = [] } = props

    function handleClick(evt) {
        // call the fn passed into props as onDeleteClicked
        props.onDeleteClicked(parseInt(evt.target.attributes.group.value, 10))
    }
    return (
        <ul className="list-group fudget">
            {groups.map(group => (
                <ListGroupItem key={group.id}>
                    <Link
                        to={`/groups/${group.id}`}
                        className="fudget-router-link"
                    >
                        <div className="info">
                            {numeral(group.opening_balance).format('$0,0.00')} -{' '}
                            {group.description} (Date:{' '}
                            {moment(group.start_date).format('LL')})
                        </div>
                    </Link>
                    <div className="del">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={handleClick}
                            group={group.id}
                        >
                            Delete
                        </button>
                    </div>
                </ListGroupItem>
            ))}
        </ul>
    )
}

/* Styles */

injectGlobal`
    .list-group-item .fudget-router-link {
        text-align: left;
        flex: 1;
    }
`
