import React, { Component } from 'react'
import Block from './partials/Block'
import PostList from './partials/PostList'
import PostService from '../services/posts'

function List(props) {
    const items = props.todos.map((item, index) => (
        <li className="list-group-item" key={index}>
            {item}
        </li>
    ))
    return <ul className="list-group">{items}</ul>
}

export default class extends Component {
    constructor() {
        super()
        this.state = {
            value: '',
            message: '',
            todos: [],
            users: []
        }
    }

    componentDidMount() {
        return PostService.get(
            'https://jsonplaceholder.typicode.com/users'
        ).then(data => {
            this.setState({ users: data })
        })
    }

    revealDiv = id => {
        // show div matching id
        const messages = {
            1: 'Heading one clicked',
            2: 'Heading two clicked',
            3: 'Heading three clicked'
        }

        this.setState({ message: messages[id] })
    }

    addToDo = () => {
        const newTodos = [...this.state.todos, [this.state.value]]
        this.setState({ todos: newTodos })
    }

    handleChange = evt => {
        this.setState({ value: evt.target.value })
    }
    render() {
        return (
            <main role="main">
                <h1>{this.state.message}</h1>
                {/* <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">Hello, world!</h1>
                        <p>
                            This is a template for a simple marketing or
                            informational website. It includes a large callout
                            called a jumbotron and three supporting pieces of
                            content. Use it as a starting point to create
                            something more unique.
                        </p>
                        <p>
                            <a
                                className="btn btn-primary btn-lg"
                                href="#"
                                role="button"
                            >
                                Learn more &raquo;
                            </a>
                        </p>
                    </div>
                </div> */}

                <div className="container">
                    <div className="row">
                        <Block
                            heading="Heading One"
                            onButtonClicked={this.revealDiv}
                            blockId={1}
                        >
                            <p>
                                Donec id elit non mi porta gravida at eget
                                metus. Fusce dapibus, tellus ac cursus commodo,
                                tortor mauris condimentum nibh, ut fermentum
                                massa justo sit amet risus. Etiam porta sem
                                malesuada magna mollis euismod. Donec sed odio
                                dui.{' '}
                            </p>
                        </Block>
                        <Block
                            heading="Heading Two"
                            onButtonClicked={this.revealDiv}
                            blockId={2}
                        >
                            <p>
                                Donec id elit non mi porta gravida at eget
                                metus. Fusce dapibus, tellus ac cursus commodo,
                                tortor mauris condimentum nibh, ut fermentum
                                massa justo sit amet risus. Etiam porta sem
                                malesuada magna mollis euismod. Donec sed odio
                                dui.{' '}
                            </p>
                        </Block>
                        <Block
                            heading="Heading Three"
                            onButtonClicked={this.revealDiv}
                            blockId={3}
                        >
                            <p>
                                Donec id elit non mi porta gravida at eget
                                metus. Fusce dapibus, tellus ac cursus commodo,
                                tortor mauris condimentum nibh, ut fermentum
                                massa justo sit amet risus. Etiam porta sem
                                malesuada magna mollis euismod. Donec sed odio
                                dui.{' '}
                            </p>
                        </Block>
                    </div>

                    <hr />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="To Do"
                                aria-label="todo"
                                aria-describedby="basic-addon1"
                                value={this.newToDo}
                                onChange={this.handleChange}
                            />
                            <button type="button" onClick={this.addToDo}>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <List todos={this.state.todos} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <PostList users={this.state.users} />
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
