import React from 'react'
import { Link } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'
import ListGroupItem from './ListGroupItem'
import moment from 'moment'

export default props => {
    function handleClick(evt) {
        // call the fn passed into props as onDeleteClicked
        props.onDeleteClicked(parseInt(evt.target.attributes.acc.value, 10))
    }
    return (
        <ul className="list-group fudget">
            {props.accounts.map(acc => (
                <ListGroupItem key={acc.id}>
                    <Link
                        to={`/accounts/${acc.id}`}
                        className="fudget-router-link"
                    >
                        <div className="info">
                            {acc.name} - {acc.description} ( Created:{' '}
                            {moment(acc.created_at).format('LL')})
                        </div>
                    </Link>
                    <div className="del">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={handleClick}
                            acc={acc.id}
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
