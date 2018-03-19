import React from 'react'
import { Route } from 'react-router-dom'
import Accounts from './Accounts'

const routes = [
    {
        path: '/',
        exact: true,
        heading: () => <h2>Home</h2>,
        content: () => <div>home!</div>
    },
    {
        path: '/users',
        heading: () => <h2>User List</h2>,
        content: () => <div>Users!</div>
    },
    {
        path: '/posts',
        heading: () => <h2>Post List</h2>,
        content: () => <div>Posts!</div>
    },
    {
        path: '/accounts',
        heading: () => <h2>Account List</h2>,
        content: Accounts
    }
]

export default () => (
    <div style={{ padding: '4rem' }}>
        <header>
            <div>Header</div>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    component={route.heading}
                    exact={route.exact}
                />
            ))}
        </header>
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
