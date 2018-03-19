import React from 'react'

export default class extends React.Component {
    render() {
        const { users } = this.props

        return (
            <ul className="list-group">
                {users.map(user => (
                    <li className="list-group-item" key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        )
    }
}
