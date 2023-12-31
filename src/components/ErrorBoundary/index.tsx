import React, { Component, ErrorInfo, ReactNode } from "react";
import Fallback from "components/Fallback";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    console.error("Uncaught error:");

    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? (
      <div style={{ height: "100vh", background: "black" }}>
        <Fallback />
      </div>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
