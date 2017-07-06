import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { getFeatures, listFeature } from "./actions";
import { showDialog } from "containers/App/actions";
import { selectDialog } from "containers/App/selectors";
import {
  selectFeatures,
  selectFeatureLoadingState,
  selectFeaturesResponse
} from "./selectors";
import AddDynamicFeature from "./containers/AddDynamicFeature";
import FeatureEditDialog from "./containers/FeatureEditDialog";
import Loader from "components/Loader";

const mapStateToProps = createStructuredSelector({
  features: selectFeatures(),
  isRequesting: selectFeatureLoadingState(),
  response: selectFeaturesResponse(),
  dialog: selectDialog()
});

const mapDispatchToProps = dispatch => ({
  fetchFeatures: () => dispatch(getFeatures()),
  listFeature: (features, feature_type) =>
    dispatch(listFeature(features, feature_type)),
  showDialog: dialog => dispatch(showDialog(dialog)),
  hideDialog: () => dispatch(showDialog(null))
});

class FeatureSetting extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    this.props.fetchFeatures();
  }

  listFeatureByType = (feature_info, feature_type) => {
    event.preventDefault();
    this.props.listFeature(feature_info, feature_type);
  };

  editFeatureByType = (feature_info, feature_type, id) => {
    event.preventDefault();
    this.props.listFeature(feature_info, feature_type);
  };

  handleFeatureEdit = (event, feature) => {
    event.preventDefault();
    this.setState({ show: true });
    const dialog = (
      <FeatureEditDialog
        feature={feature}
        onClose={() => this.props.hideDialog(null)}
      />
    );
    this.props.showDialog(dialog);
  };

  handleFeatureAdd = (event, feature, feature_type, id) => {
    event.preventDefault();
    this.setState({ show: true });
    const dialog = (
      <AddDynamicFeature
        feature={feature}
        feature_type={feature_type}
        onClose={() => this.props.hideDialog(null)}
      />
    );
    this.props.showDialog(dialog);
  };

  handleFeatureEdit = (event, features, feature) => {
    event.preventDefault();
    this.setState({ show: true });
    const dialog = (
      <FeatureEditDialog
        feature={features}
        specificFeature={feature}
        onClose={() => this.props.hideDialog(null)}
      />
    );
    this.props.showDialog(dialog);
  };

  renderFeatureName(features) {
    return features.features.map(feature => {
      return (
        <div key={feature._id}>
          <div className="card card-sm clickable">
            <h5>{feature.feature_name}</h5>
            <p className="twoLine">
              {feature.feature_description}
            </p>
            <button
              className="btn btn-default floating"
              onClick={event =>
                this.handleFeatureEdit(event, features, feature)}
            >
              <i className="icon-pencil" />
            </button>
          </div>
        </div>
      );
    });
  }

  renderFeatureType() {
    const { features } = this.props;
    return features.length > 0
      ? features.map(feature => {
          return (
            <div className="features" key={feature._id}>
              <h3 className="bold">{feature.feature_name}</h3>
              <div className="cards">
                {this.renderFeatureName(feature)}
                <div
                  className="card card-sm card-add clickable"
                  onClick={event =>
                    this.handleFeatureAdd(event, feature, feature.feature_type)}
                >
                  <button className="btn btn-link">
                    <i className="icon-plus" />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      : <p>No content</p>;
  }

  render() {
    const { features, dialog, response } = this.props;
    if (this.props.isRequesting) {
      return <p>Loading...</p>;
    }
    const successResponse = response && response.data ? response.data : null;
    return (
      <div className="container">
        <h1>Features Setting</h1>
        {this.renderFeatureType()}
        {this.state.show ? dialog : null}
      </div>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(
//   Loader("isRequesting")(FeatureSetting)
// );
export default connect(mapStateToProps, mapDispatchToProps)(FeatureSetting);
