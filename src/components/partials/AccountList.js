import React from 'react'

export default props => {
    function handleClick(evt) {
        props.onDeleteClicked(parseInt(evt.target.attributes.acc.value))
    }
    return (
        <ul className="list-group">
            {props.accounts.map(acc => (
                <li className="list-group-item" key={acc.id}>
                    <span className="info">
                        {acc.name} - {acc.description} (created:{' '}
                        {acc.created_at})
                    </span>
                    <span className="del">
                        <button
                            type="button"
                            onClick={handleClick}
                            acc={acc.id}
                        >
                            Delete
                        </button>
                    </span>
                </li>
            ))}
        </ul>
    )
}
