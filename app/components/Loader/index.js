import React from "react";
import EarthSpinning from "assets/img/earthSpinning.svg";

const Loader = prop => WrappedComponent => {
  return class Loader extends React.PureComponent {
    render() {
      return this.props[prop]
        ? <div className="earth-spinning">
            <img
              src={EarthSpinning}
              alt="spinner"
              style={{ margin: "0 auto" }}
            />
          </div>
        : <WrappedComponent {...this.props} />;
    }
  };
};

export default Loader;
