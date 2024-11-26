import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error captured in ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Er is iets misgegaan. Probeer het later opnieuw.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;