import React from "react";
import "./css/icons.css";

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label} &nbsp; <i className={`fa fa-${this.props.icon}`} />
      </span>
    );
  }
}

export default StyleButton;
