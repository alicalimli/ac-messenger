import { fixing_bug } from "assets/images";
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

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen flex justify-center items-center">
          <ErrorMsg msg="Oops, Something wen't wrong" img={fixing_bug} />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
