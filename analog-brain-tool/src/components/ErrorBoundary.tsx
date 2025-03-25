import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// if this causes issues, might want to use npm react-error-boundary instead
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-5 border border-red-500 bg-red-50 text-red-900 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Something went wrong!</h2>
          <p className="mb-4">
            <strong>Error:</strong> {this.state.error?.message}
          </p>
          <details className="mt-3">
            <summary className="cursor-pointer font-medium text-red-700">Stack Trace</summary>
            <pre className="mt-2 p-3 bg-red-100 text-red-800 rounded overflow-auto whitespace-pre-wrap break-words">
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
