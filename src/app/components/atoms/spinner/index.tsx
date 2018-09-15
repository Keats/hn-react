import * as React from "react";

export interface ISpinnerProps {
  size?: number;
}

class Spinner extends React.Component<ISpinnerProps, {}> {
  public static defaultProps: ISpinnerProps = {
    size: 32,
  };

  public render() {
    const {size} = this.props;

    return (
      <div className="progress-circular" style={{width: size + "px", height: size + "px"}}>
        <svg
          viewBox="25 25 50 50"
          aria-valuemax="100"
          aria-valuemin="0"
        >
          <circle
            className="progress-circular__path"
            cx="50"
            cy="50"
            fill="none"
            r="20"
            strokeMiterlimit="10"
            strokeWidth="4"
          />
        </svg>
      </div>
    );
  }
}

export default Spinner;
