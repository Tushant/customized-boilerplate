import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { cloudinaryRequest, fetchCloudinary } from "./actions";
import { selectCloudinary } from "./selectors";
import TextFieldGroup from "utils/textFieldGroup";
import Spinner from "assets/img/earthSpinning.svg";

const mapDispatchToProps = dispatch => ({
  requestCloudinary: cloudinary => dispatch(cloudinaryRequest(cloudinary)),
  loadCloudinary: () => dispatch(fetchCloudinary())
});

const mapStateToProps = createStructuredSelector({
  cloudinaryService: selectCloudinary()
});

class Cloudinary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cloudinary: {
        _id: "",
        cloudinary_cloud_name: "",
        cloudinary_api_key: "",
        cloudinary_api_secret: ""
      },
      errors: {}
    };
  }

  componentDidMount() {
    this.props.loadCloudinary();
  }

  componentWillReceiveProps(nextProps, prevProps) {
    const { cloudinaryService } = nextProps;
    if (cloudinaryService.size) {
      cloudinaryService
        .entrySeq()
        .map(([key, value]) => {
          this.setState(state => ({
            cloudinary: { ...state.cloudinary, [key]: value }
          }));
        })
        .toArray();
    }
  }

  handleChange = event => {
    const fieldName = event.target.name;
    this.setState(
      {
        cloudinary: {
          ...this.state.cloudinary,
          [event.target.name]: event.target.value
        }
      },
      () => {
        this.validateField([fieldName]);
      }
    );
  };

  handleBlur = event => {
    const fieldName = event.target.name;
    this.validateField([fieldName]);
  };

  validateField = validate => {
    const errors = { ...this.state.errors };
    let hasError = false;
    validate.forEach(field => {
      if (this.state.cloudinary[field].length === 0) {
        hasError = true;
        errors[field] = `${field} cannot be empty`;
      } else {
        errors[field] = "";
      }
    });
    this.setState({ errors });
    return !hasError;
  };

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.validateField([
        "cloudinary_cloud_name",
        "cloudinary_api_key",
        "cloudinary_api_secret"
      ])
    ) {
      this.props.requestCloudinary(this.state.cloudinary);
      console.log("event", event.target);
    }
  };

  render() {
    const { cloudinary, errors } = this.state;
    const { cloudinaryService } = this.props;
    console.log("cloudinaryService", cloudinaryService);
    let message;
    if (typeof cloudinaryService === "string") {
      message = <div>{cloudinaryService}</div>;
    }
    if (cloudinaryService.size === 0) {
      return (
        <div className="earth-spinning">
          <img src={Spinner} alt="spinner" style={{ margin: "0 auto" }} />
        </div>
      );
    }
    return (
      <div className="container cloudinary">
        {message}
        <h1>Cloudinary Settings</h1>
        <form onSubmit={this.handleSubmit}>
          <TextFieldGroup
            id="formControlsText"
            name="cloudinary_cloud_name"
            type="text"
            value={cloudinary.cloudinary_cloud_name}
            label="Cloud Name"
            placeholder="Enter Cloud Name"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            error={errors.cloudinary_cloud_name}
            required
          />
          <TextFieldGroup
            id="formControlsText"
            name="cloudinary_api_key"
            type="text"
            value={cloudinary.cloudinary_api_key}
            label="API Key"
            placeholder="Enter API Key"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            error={errors.cloudinary_api_key}
            required
          />
          <TextFieldGroup
            id="formControlsText"
            name="cloudinary_api_secret"
            type="text"
            value={cloudinary.cloudinary_api_secret}
            label="API Secret"
            placeholder="Enter API Secret"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            error={errors.cloudinary_api_secret}
            required
          />
          <button className="btn btn-default">Save changes</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cloudinary);
