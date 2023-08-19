import React from "react";

export class ErrorBoundary extends React.Component
{
    constructor(props: React.PropsWithChildren) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        
    }

    render(): React.ReactNode {
        if(this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}