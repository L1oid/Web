import React from "react";

class Component extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.getValue(e.target.value);
    }

    render() {
        return (
            <input className={this.props.class} type={this.props.type} placeholder={this.props.placeholder} onChange={this.handleChange}></input>
        )
    }
}

export default Component;