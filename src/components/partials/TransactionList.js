import React from 'react'
import { Link } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'
import ListGroupItem from './ListGroupItem'
import numeral from 'numeral'
import moment from 'moment'

export default props => {
    const { transactions = [] } = props
    /**
     * Call the function passed into the
     * onDeleteClicked prop.
     *
     * Think of this as an event emitter of sorts.
     *
     * @param {object} evt the click event
     *
     * @returns undefined
     */
    function handleClick(evt) {
        debugger
        props.onDeleteClicked(
            parseInt(evt.currentTarget.attributes.transaction.value, 10)
        )
    }
    return (
        <ul className="list-group fudget transactionList">
            <ListGroupItem classnames="columnHeadings">
                <div className="">Date</div>
                <div className="">Actual Expense</div>
                <div className="">Expected Expense</div>
                <div className="">Expected Income</div>
                <div className="">Actual Income</div>
                <div className="listItemAction">Actions</div>
            </ListGroupItem>
            {transactions.map(transaction => (
                <ListGroupItem key={transaction.id}>
                    <div className="">
                        {moment(transaction.date).format('M/DD')}
                    </div>
                    <div className="">
                        {transaction.actual_out
                            ? numeral(transaction.actual_out).format('$0,0.00')
                            : '--'}
                    </div>
                    <div className="">
                        {transaction.expected_out
                            ? numeral(transaction.expected_out).format(
                                  '$0,0.00'
                              )
                            : '--'}
                    </div>
                    <div className="">
                        {transaction.expected_in
                            ? numeral(transaction.expected_in).format('$0,0.00')
                            : '--'}
                    </div>
                    <div className="">
                        {transaction.actual_in
                            ? numeral(transaction.actual_in).format('$0,0.00')
                            : '--'}
                    </div>
                    <div className="listItemAction">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={handleClick}
                            transaction={transaction.id}
                        >
                            <span className="btn-text">Delete</span>
                            <span className="btn-icon">X</span>
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
