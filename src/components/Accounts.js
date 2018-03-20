import React from 'react'
import api from '../services/api'
import AccountList from './partials/AccountList'

/* 
    Accounts Component
    
    Responsible for rendering the following:
    - create account form
    - accounts list
*/
export default class extends React.Component {
    constructor() {
        super()
        this.state = {
            accounts: [],
            name: '',
            description: ''
        }
    }

    render() {
        return (
            <section className="fudget accounts container">
                <div className="row">
                    <div className="col">
                        <form>
                            <div className="form-row">
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label
                                                className="input-group-text"
                                                htmlFor="account_name"
                                            >
                                                Name
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="account_name"
                                            name="name"
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                            placeholder="Enter account name."
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label
                                                className="input-group-text"
                                                htmlFor="account_description"
                                            >
                                                Description
                                            </label>
                                        </div>

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="account_description"
                                            name="description"
                                            onChange={this.handleChange}
                                            value={this.state.description}
                                            placeholder="Enter account description. (optional)"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="input-group submit-right">
                                        <button
                                            type="button"
                                            onClick={this.createNewAccount}
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
                        <AccountList
                            accounts={this.state.accounts}
                            onDeleteClicked={this.deleteAccount}
                        />
                    </div>
                </div>
            </section>
        )
    }

    /* -----------------------------
    Life Cycle Hooks
    ------------------------------- */

    componentDidMount() {
        api()
            .get('accounts')
            .then(data => {
                this.setState({ accounts: data })
            })
    }

    /* -----------------------------
    CRUD Operations
    ------------------------------- */
    createNewAccount = () => {
        const { name, description } = this.state

        api()
            .post('accounts', { name, description })
            .then(data => {
                this.setState({ accounts: [...this.state.accounts, data] })
                this.setState({ name: '', description: '' })
            })
    }

    /**
     * Delete an account
     *
     * @param {number} id Account id
     * @returns undefined
     */
    deleteAccount = id => {
        api()
            .del('accounts/' + id)
            .then(res => {
                const accounts = this.state.accounts.filter(
                    acc => acc.id !== id
                )

                this.setState({ accounts })
            })
    }

    /* -----------------------------
    Event Handlers
    ------------------------------- */

    /**
     * Track the form input values
     *
     * name, description
     *
     * @param {object} evt change event
     * @returns undefined
     */
    handleChange = evt => {
        const { value, name } = evt.target

        this.setState({
            [name]: value
        })
    }
}
