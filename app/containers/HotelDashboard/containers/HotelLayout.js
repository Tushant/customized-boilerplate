import React from "react";
import "assets/css/bootstrap.css";
import "assets/css/app.css";
import "../component.css";

class HotelLayout extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default HotelLayout;
