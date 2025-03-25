import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export enum BrainToolErrorType {
  FAILED_TO_LOAD_SETS = 'FAILED_TO_LOAD_SETS',
  FAILED_TO_FETCH_INDEX = 'FAILED_TO_FETCH_INDEX',
  FAILED_TO_FETCH_SET = 'FAILED_TO_FETCH_SET',
  NO_AVAILABLE_SETS_FOR_LANG = 'NO_AVAILABLE_SETS_FOR_LANG',
}

export class BrainToolError extends Error {
  constructor(message: string, public brainError: BrainToolErrorType) {
    super(message);
    Object.setPrototypeOf(this, BrainToolError.prototype);
  }
}

class BrainToolErrorHandler extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
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

      switch (this.state.error.brainError) {
        case BrainToolErrorType.FAILED_TO_LOAD_SETS:
          // ...
          break;
      }

      return (
        <div>
          <div className="text-xl font-bold mb-2">Failed to load card sets!</div>
          <strong>Error:</strong> {this.state.error?.message}
        </div>
      );
    }
    return this.props.children;
  }
}

export default BrainToolErrorHandler;
