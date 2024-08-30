'use client';

import { Button } from '@mui/material';
import styles from './ErrorBoundary.module.scss';
import { Component, ReactNode } from 'react';

interface IErrorBoundaryState {
  hasError: boolean;
}

interface IProps {
  children?: ReactNode;
}

class ErrorBoundary extends Component<IProps, IErrorBoundaryState> {
  state: Readonly<IErrorBoundaryState>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
    };
    this.closeError = this.closeError.bind(this);
  }

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(): void {
    console.error('Oops... React caught an error');
  }

  closeError() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBlock}>
          <h1 className={styles.header}>Something went wrong :(</h1>
          <Button variant="contained" onClick={this.closeError}>
            Try again
          </Button>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
