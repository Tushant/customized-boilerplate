import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchEmailService, emailServiceRequest } from "./actions";
import { selectEmailService } from "./selectors";
import TextFieldGroup from "utils/textFieldGroup";

const mapDispatchToProps = dispatch => ({
  fetchEmailService: () => dispatch(fetchEmailService()),
  emailServiceRequest: emailService =>
    dispatch(emailServiceRequest(emailService))
});

const mapStateToProps = createStructuredSelector({
  email: selectEmailService()
});

class EmailService extends React.PureComponent {
  state = {
    notification: "",
    emailService: {
      api_key: "",
      domain: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.props.fetchEmailService();
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (nextProps.email.size) {
      nextProps.email
        .entrySeq()
        .map(([key, value]) => {
          this.setState(state => ({
            emailService: { ...state.emailService, [key]: value }
          }));
        })
        .toArray();
    }
    if (typeof nextProps.email === "string") {
      this.setState({ notification: nextProps.email });
    }
  }

  handleChange = event => {
    const fieldName = event.target.name;
    this.setState(
      {
        emailService: {
          ...this.state.emailService,
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
      if (this.state.emailService[field].length === 0) {
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
    if (this.validateField(["api_key", "domain"])) {
      console.log("you can now submit the data");
      this.props.emailServiceRequest(this.state.emailService);
    }
  };

  render() {
    const { emailService, errors } = this.state;
    const { email } = this.props;
    console.log("email render", email);
    if (email.size === 0) {
      return <div>fetching...</div>;
    }
    return (
      <div className="container">
        {this.state.notification && this.state.notification}
        <form onSubmit={this.handleSubmit}>
          <h1>We use mailgun as an email service</h1>
          <TextFieldGroup
            name="api_key"
            type="text"
            value={emailService.api_key}
            label="API Key"
            placeholder="Enter API Key"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            error={errors.api_key}
            required
          />
          <TextFieldGroup
            name="domain"
            type="text"
            value={emailService.domain}
            label="Domain"
            placeholder="Enter Domain"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            error={errors.domain}
            required
          />
          <button className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailService);
