import React, { ErrorInfo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

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
  FAILED_TO_LOAD_DATA_VALIDATOR = 'FAILED_TO_LOAD_DATA_VALIDATOR',
}

export class BrainToolError extends Error {
  constructor(message: string, public brainError: BrainToolErrorType, printToConsole: boolean = true) {
    super(message);
    Object.setPrototypeOf(this, BrainToolError.prototype);
    if (printToConsole) console.error(message);
  }
}

import { FC } from 'react';

interface BrainToolErrorHandlerProps {
  error: BrainToolError;
}

const BrainToolErrorHandlerMessage: FC<BrainToolErrorHandlerProps> = ({ error }) => {
  const { t } = useTranslation();

  let errorMsg = '';
  switch (error.brainError) {
    case BrainToolErrorType.FAILED_NO_VALID_SETS:
      errorMsg = t('tool.errors.noValidSets');
      break;
    case BrainToolErrorType.FAILED_TO_FETCH_INDEX:
      errorMsg = t('tool.errors.failedToFetchIndex');
      break;
    case BrainToolErrorType.FAILED_TO_FETCH_SET:
      errorMsg = t('tool.errors.failedToFetchSet');
      break;
    case BrainToolErrorType.NO_AVAILABLE_SETS_FOR_LANG:
      errorMsg = t('tool.errors.noSetForCurrentLang');
      break;
    case BrainToolErrorType.FAILED_TO_LOAD_DATA_VALIDATOR:
      errorMsg = t('tool.errors.generic');
      break;
  }

  return (
    <div className="p-20">
      <div className="text-xl font-bold mb-2">Failed to load card sets!</div>
      {errorMsg && <div>{errorMsg}</div>}
    </div>
  );
};

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
