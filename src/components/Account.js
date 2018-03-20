import React from 'react'
import api from '../services/api'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import numeral from 'numeral'
import GroupList from './partials/GroupList'

import 'react-datepicker/dist/react-datepicker.css'

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.id = props.match.params.id

        this.state = {
            account: {},
            groups: [],
            startDateMoment: moment(),
            start_date: moment().format('YYYY-MM-DD'),
            opening_balance: 0
        }
    }

    render() {
        return (
            <section className="fudget transaction-groups container">
                <div className="row">
                    <div className="col">
                        <form>
                            <div className="form-row">
                                <div className="col-md-5">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label
                                                className="input-group-text"
                                                htmlFor="group_start_date"
                                            >
                                                Start Date
                                            </label>
                                        </div>
                                        <DatePicker
                                            selected={
                                                this.state.startDateMoment
                                            }
                                            onChange={this.handleChange}
                                            className="form-control"
                                            dateFormat="LL"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-5">
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
                                            onChange={this.handleInput}
                                            value={this.state.opening_balance}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="input-group submit-right">
                                        <button
                                            type="button"
                                            onClick={this.saveTransactionGroup}
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
                        <GroupList
                            groups={this.state.groups}
                            onDeleteClicked={this.deleteTransactionGroup}
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
            .get(`accounts/${this.id}`)
            .then(account => {
                this.setState({ account, groups: [...account.groups] })
            })
    }

    /* -----------------------------
    Event Handlers
    ------------------------------- */

    handleChange = date => {
        this.setState({
            startDateMoment: date,
            start_date: date.format('YYYY-MM-DD')
        })
    }

    handleInput = evt => {
        const { name, value } = evt.target

        this.setState({
            [name]: value
        })
    }

    /* -----------------------------
    CRUD Operations
    ------------------------------- */

    saveTransactionGroup = () => {
        const payload = {
            start_date: this.state.start_date,
            opening_balance: numeral(this.state.opening_balance).format('0.00'),
            account_id: this.id
        }
        api()
            .post('transaction-groups', payload)
            .then(group => {
                this.setState({
                    groups: [...this.state.groups, group]
                })
            })
    }

    deleteTransactionGroup = id => {
        api()
            .del('transaction-groups/' + id)
            .then(res => {
                const groups = this.state.groups.filter(
                    group => group.id !== id
                )

                this.setState({
                    groups
                })

                console.log(this.state.account)
            })
    }
}
