import React, { Component } from 'react'

export default class extends Component {
    handleClick = () => {
        this.props.onButtonClicked(this.props.blockId)
    }
    render() {
        return (
            <div className="col-md-4">
                <h2>{this.props.heading}</h2>
                {this.props.children}
                <p>
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={this.handleClick}
                    >
                        View details &raquo;
                    </button>
                </p>
            </div>
        )
    }
}
