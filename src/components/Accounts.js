import React from 'react'
import api from '../services/api'
import AccountList from './partials/AccountList'

export default class extends React.Component {
    constructor() {
        super()
        this.state = {
            accounts: [],
            name: '',
            description: ''
        }
    }
    handleChange = evt => {
        const { value, name } = evt.target

        this.setState({
            [name]: value
        })
    }

    handleNewAccount = () => {
        const { name, description } = this.state

        api()
            .post('accounts', { name, description })
            .then(data => {
                this.setState({ accounts: [...this.state.accounts, data] })
                this.setState({ name: '', description: '' })
            })
    }

    handleDelete = id => {
        api()
            .del('accounts/' + id)
            .then(res => {
                const accounts = this.state.accounts.filter(
                    acc => acc.id !== id
                )

                this.setState({ accounts })
            })
    }

    componentDidMount() {
        api()
            .get('accounts')
            .then(data => {
                this.setState({ accounts: data })
            })
    }

    render() {
        return (
            <section className="accounts">
                <form>
                    <div className="form-group">
                        <label htmlFor="account_name">Name</label>
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
                    <div className="form-group">
                        <label htmlFor="account_description">Description</label>
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
                    <button
                        type="button"
                        onClick={this.handleNewAccount}
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                </form>
                <AccountList
                    accounts={this.state.accounts}
                    onDeleteClicked={this.handleDelete}
                />
            </section>
        )
    }
}
