import { no_results } from "assets/images";
import { ErrorMsg } from "components";
import { Component, ReactNode } from "react";

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
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorMsg msg="Something wen't wrong" img={no_results} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
