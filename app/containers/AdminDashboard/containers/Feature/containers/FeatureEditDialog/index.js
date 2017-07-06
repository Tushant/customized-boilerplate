import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "react-bootstrap/lib/Modal";
import { selectFeatureToEditById } from "../../selectors";
import { editFeature } from "../../actions";

const mapStateToProps = createStructuredSelector({
  getFeatureToEditById: selectFeatureToEditById()
});

const mapDispatchToProps = dispatch => ({
  editFeature: (features, feature_type) =>
    dispatch(editFeature(features, feature_type))
});

class FeatureEditDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    let featureName = props.specificFeature.feature_name;
    let featureDescription = props.specificFeature.feature_description;
    this.state = {
      property_type: {
        _id: props.specificFeature._id,
        feature_name: featureName,
        feature_description: featureDescription
      }
    };
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      property_type: {
        ...this.state.property_type,
        [name]: value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { editFeature, feature } = this.props;
    editFeature(this.state.property_type, feature.feature_type);
  };

  render() {
    const { property_type } = this.state;
    const { feature } = this.props;
    return (
      <Modal className="modal-sm" show onHide={() => this.props.onClose()}>
        <Modal.Header closeButton>
          <h2 className="text-center">Edit {feature.feature_name}</h2>
        </Modal.Header>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-block">
            <input
              type="text"
              className="form-control"
              name="feature_name"
              value={property_type.feature_name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group form-block">
            <textarea
              className="form-control"
              name="feature_description"
              rows={5}
              cols={5}
              value={property_type.feature_description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group form-block">
            <button className="btn btn-default">
              Save {property_type.feature_name}
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureEditDialog);
