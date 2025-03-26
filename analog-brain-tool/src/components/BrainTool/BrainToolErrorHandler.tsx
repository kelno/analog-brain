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
  FAILED_NO_VALID_SETS = 'FAILED_NO_VALID_SETS',
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

      console.log(
        `BrainToolErrorHandler catched throw with type ${this.state.error.brainError} and message: ${this.state.error?.message}`,
      );

      //TODO translate
      let errorMsg = '';
      switch (this.state.error.brainError) {
        case BrainToolErrorType.FAILED_NO_VALID_SETS:
          errorMsg = 'No valid sets found at given index.';
          break;
        case BrainToolErrorType.FAILED_TO_FETCH_INDEX:
          errorMsg = 'Failed to fetch sets index file.';
          break;
        case BrainToolErrorType.FAILED_TO_FETCH_SET:
          errorMsg = 'Failed to fetch a set.';
          break;
        case BrainToolErrorType.NO_AVAILABLE_SETS_FOR_LANG:
          errorMsg = 'No set found for current language.';
          break;
      }

      return (
        <div className="p-20">
          <div className="text-xl font-bold mb-2">Failed to load card sets!</div>
          {errorMsg && <div>{errorMsg}</div>}
        </div>
      );
    }
    return this.props.children;
  }
}

export default BrainToolErrorHandler;
