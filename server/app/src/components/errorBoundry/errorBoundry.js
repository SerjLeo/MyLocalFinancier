import React, {Component} from 'react';
import {DefaultError} from '../Errors';

export default class ErrorBoundry extends Component {

    state = {
        error: false
    }
    componentDidCatch(){
        this.setState({
            error: true
        });
    }
    render() {
       if (this.state.error) {
            return <DefaultError/>
       }


        return this.props.children;
    }
}