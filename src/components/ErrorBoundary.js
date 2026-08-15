import React, { Component } from "react";

/**
 * Catches render errors from anything below it and shows a fallback instead of
 * unmounting the whole app.
 *
 * This HAS to be a class component - getDerivedStateFromError and
 * componentDidCatch still have no hook equivalent. It is the one thing you
 * cannot write with hooks.
 *
 * Why lazy routes especially need one: a code-split chunk is a separate network
 * request. On a flaky connection that request can fail, React.lazy rejects, and
 * without a boundary the user gets a blank white page with nothing to click.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // RENDER phase - decide what to show. Must stay pure, so no logging here.
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // COMMIT phase - side effects belong here
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo.componentStack);
    // in a real app: logToSentry(error, errorInfo)
  }

  handleRetry = () => {
    // Clearing the error re-renders the children, which makes React.lazy
    // retry the failed chunk download.
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="page error-state">
        <span className="error-state-icon">⚠️</span>
        <h2 className="error-state-title">
          {this.props.title ?? "Something went wrong"}
        </h2>
        <p className="error-state-text">
          {this.props.message ??
            "We could not load this page. Check your connection and try again."}
        </p>

        {this.state.error?.message && (
          <code className="error-state-detail">{this.state.error.message}</code>
        )}

        <button className="error-state-btn" onClick={this.handleRetry}>
          Try again
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
