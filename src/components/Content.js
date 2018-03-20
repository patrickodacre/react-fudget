import React from 'react'
import { Route } from 'react-router-dom'
import Accounts from './Accounts'
import Account from './Account'
import Transactions from './Transactions'

export default () => (
    <div id="main-content" className="mb-5">
        <div id="content">
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    component={route.content}
                    exact={route.exact}
                />
            ))}
        </div>
    </div>
)

const routes = [
    {
        path: '/',
        exact: true,
        content: () => <h2>Home</h2>
    },
    {
        path: '/users',
        content: () => <h2>User List</h2>
    },
    {
        path: '/posts',
        content: () => <h2>Post List</h2>
    },
    {
        path: '/accounts',
        content: Accounts,
        exact: true
    },
    {
        path: '/accounts/:id',
        content: Account,
        exact: true
    },
    {
        path: '/groups/:id',
        content: Transactions,
        exact: true
    }
]
