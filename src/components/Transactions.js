import React from 'react'
import api from '../services/api'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import numeral from 'numeral'
import TransactionList from './partials/TransactionList'
import ListGroupItem from './partials/ListGroupItem'

import 'react-datepicker/dist/react-datepicker.css'
import register from '../registerServiceWorker'

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.id = props.match.params.id

        this.state = {
            group: {},
            transactions: [],
            date: moment().format('YYYY-MM-DD'), // date is what is pushed to the API
            transaction_date: moment(), // just for show
            amount: 0,
            description: '',
            actual_in: 0,
            actual_out: 0,
            expected_in: 0,
            expected_out: 0,
            totalActualExpenses: 0,
            totalActualIncome: 0,
            totalExpectedExpenses: 0,
            totalExpectedIncome: 0,
            isEditingBalance: false,
            newOpeningBalance: 0
        }
    }

    render() {
        return (
            <section className="fudget transaction-groups container">
                <div className="row mb-3">
                    <div className="col">
                        Opening Balance:
                        {numeral(this.state.group.opening_balance).format(
                            '$0,0.00'
                        )}
                        <span
                            onClick={this.handleEditOpeningBalance}
                            style={{
                                cursor: 'pointer',
                                marginLeft: 10
                            }}
                        >
                            (edit)
                        </span>
                    </div>
                    <div
                        className="col"
                        style={{
                            display: this.state.isEditingBalance
                                ? 'block'
                                : 'none'
                        }}
                    >
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label
                                    className="input-group-text"
                                    htmlFor="opening_balance"
                                >
                                    Opening Balance
                                </label>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                id="opening_balance"
                                name="opening_balance"
                                onChange={this.handleUpdateOpeningBalance}
                                value={this.state.newOpeningBalance}
                            />
                            <button onClick={this.updateOpeningBalance}>
                                Update
                            </button>
                            <button onClick={this.cancelUpdateOpeningBalance}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col">
                        <ul className="list-group transactionList">
                            <ListGroupItem classnames="">
                                <div className="">Totals</div>
                                <div className="">
                                    <div className="mb-1">Actual Expenses</div>
                                    <div>
                                        {numeral(
                                            this.state.totalActualExpenses
                                        ).format('$0,0.00')}
                                    </div>
                                </div>
                                <div className="">
                                    <div className="mb-1">
                                        Expected Expenses
                                    </div>
                                    <div>
                                        {numeral(
                                            this.state.totalExpectedExpenses
                                        ).format('$0,0.00')}
                                    </div>
                                </div>
                                <div className="">
                                    <div className="mb-1">Expected Income</div>
                                    <div>
                                        {numeral(
                                            this.state.totalExpectedIncome
                                        ).format('$0,0.00')}
                                    </div>
                                </div>
                                <div className="">
                                    <div className="mb-1">Actual Income</div>
                                    <div>
                                        {numeral(
                                            this.state.totalActualIncome
                                        ).format('$0,0.00')}
                                    </div>
                                </div>
                            </ListGroupItem>
                        </ul>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <form>
                            <div className="form-row">
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label
                                                className="input-group-text"
                                                htmlFor="transaction_date"
                                            >
                                                Date
                                            </label>
                                        </div>
                                        <DatePicker
                                            selected={
                                                this.state.transaction_date
                                            }
                                            onChange={this.handleDate}
                                            dateFormat="LL"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-3">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label
                                                className="input-group-text actual_out"
                                                htmlFor="actual_out"
                                            >
                                                Actual Out
                                            </label>
                                        </div>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="actual_out"
                                            name="actual_out"
                                            onChange={this.handleInput}
                                            value={this.state.actual_out}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label
                                                className="input-group-text expected_out"
                                                htmlFor="expected_out"
                                            >
                                                Expected Out
                                            </label>
                                        </div>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="expected_out"
                                            name="expected_out"
                                            onChange={this.handleInput}
                                            value={this.state.expected_out}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label
                                                className="input-group-text expected_in"
                                                htmlFor="expected_in"
                                            >
                                                Expected In
                                            </label>
                                        </div>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="expected_in"
                                            name="expected_in"
                                            onChange={this.handleInput}
                                            value={this.state.expected_in}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label
                                                className="input-group-text actual_in"
                                                htmlFor="actual_in"
                                            >
                                                Actual In
                                            </label>
                                        </div>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="actual_in"
                                            name="actual_in"
                                            onChange={this.handleInput}
                                            value={this.state.actual_in}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <div className="input-group submit-right">
                                        <button
                                            type="button"
                                            onClick={this.saveTransaction}
                                            className="btn btn-primary"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <TransactionList
                            transactions={this.state.transactions}
                            onDeleteClicked={this.deleteTransaction}
                        />
                    </div>
                </div>
            </section>
        )
    }

    /* -----------------------------
    Life Cycle Hooks
    ------------------------------- */

    componentWillMount() {
        api()
            .get(`transaction-groups/${this.id}`)
            .then(group => {
                this.setState({ group, transactions: [...group.transactions] })

                this.calculateTotals(this.state.transactions).setState()
            })
    }

    /* -----------------------------
    CRUD Operations
    ------------------------------- */

    updateOpeningBalance = () => {
        api()
            .patch('transaction-groups/' + this.state.group.id, {
                opening_balance: this.state.newOpeningBalance
            })
            .then(group => {
                this.setState({ group, isEditingBalance: false })
            })
    }

    saveTransaction = () => {
        const payload = {
            date: this.state.date,
            amount: numeral(this.state.amount).format('0.00'),
            transaction_group_id: this.id,
            description: this.state.description,
            // Must pass up ZERO to make sure blank inputs don't cause an error
            actual_in: this.state.actual_in,
            actual_out: this.state.actual_out,
            expected_in: this.state.expected_in,
            expected_out: this.state.expected_out
        }

        api()
            .post('transactions', payload)
            .then(transaction => {
                // refresh derived values:
                this.setState({
                    transactions: [...this.state.transactions, transaction]
                })

                this.calculateTotals(this.state.transactions).setState()
            })
    }

    deleteTransaction = id => {
        api()
            .del('transactions/' + id)
            .then(res => {
                const transactions = this.state.transactions.filter(
                    transaction => transaction.id !== id
                )

                this.setState({
                    transactions
                })

                const {
                    totalActualIncome,
                    totalActualExpenses,
                    totalExpectedIncome,
                    totalExpectedExpenses
                } = this.calculateTotals(this.state.transactions)

                this.setState({
                    totalActualIncome,
                    totalActualExpenses,
                    totalExpectedIncome,
                    totalExpectedExpenses
                })
            })
    }

    /* -----------------------------
    Event Handlers
    ------------------------------- */

    handleDate = date => {
        this.setState({
            transaction_date: date,
            date: date.format('YYYY-MM-DD')
        })
    }

    handleInput = evt => {
        const { name, value } = evt.target

        this.setState({
            [name]: value || 0 // prevent empty strings
        })
    }

    handleUpdateOpeningBalance = evt => {
        const { value } = evt.target

        this.setState({
            newOpeningBalance: value
        })
    }

    cancelUpdateOpeningBalance = evt => {
        this.setState({
            isEditingBalance: false
        })
    }

    handleCheckBox = evt => {
        const { name, checked } = evt.target

        this.setState({
            [name]: checked
        })
    }

    handleEditOpeningBalance = () => {
        this.setState({
            isEditingBalance: !this.state.isEditingBalance,
            newOpeningBalance: this.state.group.opening_balance
        })
    }

    /* -----------------------------
    Utils / Helpers
    ------------------------------- */

    calculateTotals = transactions => {
        let totalActualExpenses = 0
        let totalActualIncome = 0
        let totalExpectedExpenses = 0
        let totalExpectedIncome = 0

        transactions.forEach(transaction => {
            if (transaction.actual_out) {
                totalActualExpenses += parseFloat(transaction.actual_out)
            }

            if (transaction.expected_out) {
                totalExpectedExpenses += parseFloat(transaction.expected_out)
            }

            if (transaction.expected_in) {
                totalExpectedIncome += parseFloat(transaction.expected_in)
            }

            if (transaction.actual_in) {
                totalActualIncome += parseFloat(transaction.actual_in)
            }
        })

        return {
            totalActualExpenses,
            totalActualIncome,
            totalExpectedExpenses,
            totalExpectedIncome,
            // chaining a setState is a little handy.
            // This keeps the function callsite a little cleaner.
            setState: () =>
                this.setState({
                    totalActualExpenses,
                    totalActualIncome,
                    totalExpectedExpenses,
                    totalExpectedIncome
                })
        }
    }
}
