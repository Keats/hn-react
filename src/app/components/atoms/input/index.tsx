import classNames from "classnames";
import * as React from "react";

export interface IInputProps {
  // Label to be displayed above the input, mandatory
  label: string;
  name: string;

  placeholder?: string;
  className?: string;

  // values
  value?: string;
  defaultValue?: string;

  // all events we can register
  onPressEnter?: React.FormEventHandler<any>;
  onKeyDown?: React.FormEventHandler<any>;
  onChange?: React.FormEventHandler<any>;
}

class Input extends React.PureComponent<IInputProps> {
  private input: HTMLInputElement | null = null;

  public render() {
    const {label} = this.props;

    return (
      <div className="input-container">
        <label>
          <span className="input__label">{label}</span>
          {this.renderInput()}
        </label>
      </div>
    );
  }

  protected renderInput() {
    const classes = classNames("input", this.props.className);

    return (
      <input
        ref={(el) => this.input = el}
        onKeyDown={this.handleKeyDown}
        className={classes}
        type="text"
        placeholder={this.props.placeholder}
        name={this.props.name}
        defaultValue={this.props.defaultValue}
        onChange={this.props.onChange}
      />
    );
  }

  private handleKeyDown = (e: React.KeyboardEvent<any>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
      return;
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }
}

export default Input;
