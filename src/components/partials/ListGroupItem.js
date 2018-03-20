import styled from 'styled-components'
import React from 'react'

const ListGroupItem = styled.li`
    display: flex;
`

export default props => {
    return (
        <ListGroupItem className={`list-group-item ${props.classnames}`}>
            {props.children}
        </ListGroupItem>
    )
}
