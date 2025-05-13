import React, { ErrorInfo, ReactNode } from 'react';
import { BrainToolError } from './BrainToolError';
import { BrainToolErrorHandlerMessage } from './BrainToolErrorHandlerMessage';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class BrainToolErrorHandler extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error('BrainToolContainer caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (!(this.state.error instanceof BrainToolError)) throw this.state.error; // we only handle BrainToolError

      console.log(
        `BrainToolErrorHandler catched throw with type ${this.state.error.brainError} and message: ${this.state.error?.message}`,
      );

      return <BrainToolErrorHandlerMessage error={this.state.error} />;
    }
    return this.props.children;
  }
}
