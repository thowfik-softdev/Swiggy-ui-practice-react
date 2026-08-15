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
      <div className="mx-auto flex w-full max-w-shell flex-col items-center px-4 pb-24 pt-16 text-center md:px-10 md:pt-[90px]">
        <span className="mb-4 text-[44px]">⚠️</span>
        <h2 className="mb-2 text-2xl font-bold tracking-tight">
          {this.props.title ?? "Something went wrong"}
        </h2>
        <p className="max-w-[420px] text-[14.5px] leading-relaxed text-ink-500">
          {this.props.message ??
            "We could not load this page. Check your connection and try again."}
        </p>

        {this.state.error?.message && (
          <code className="mt-4 block max-w-[520px] break-words rounded-sm border border-line bg-line-soft px-3.5 py-2.5 font-mono text-xs text-ink-500">
            {this.state.error.message}
          </code>
        )}

        <button
          className="mt-[22px] rounded-full bg-ink-900 px-[22px] py-[11px] text-sm font-semibold text-surface transition-colors hover:bg-brand"
          onClick={this.handleRetry}
        >
          Try again
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
