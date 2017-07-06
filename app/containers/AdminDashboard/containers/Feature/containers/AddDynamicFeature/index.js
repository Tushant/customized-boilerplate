import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "react-bootstrap/lib/Modal";
import { selectFeatureToEditById } from "../../selectors";
import { editFeature, listFeature } from "../../actions";

const mapStateToProps = createStructuredSelector({
  getFeatureToEditById: selectFeatureToEditById()
});

const mapDispatchToProps = dispatch => ({
  listFeature: (features, feature_type) =>
    dispatch(listFeature(features, feature_type))
});

class AddDynamicFeature extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      property_type: {
        feature_name: "",
        feature_description: ""
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
    const { listFeature, feature_type } = this.props;
    listFeature(this.state.property_type, feature_type);
  };

  render() {
    const { property_type } = this.state;
    const { feature_type, feature } = this.props;
    return (
      <Modal className="modal-sm" show onHide={() => this.props.onClose()}>
        <Modal.Header closeButton>
          <h2 className="text-center">Add {feature.feature_name}</h2>
        </Modal.Header>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-block">
            <input
              type="text"
              className="form-control"
              name="feature_name"
              placeholder="Feature Name"
              value={property_type.feature_name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group form-block">
            <textarea
              className="form-control"
              name="feature_description"
              placeholder="Feature Description"
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

export default connect(mapStateToProps, mapDispatchToProps)(AddDynamicFeature);
