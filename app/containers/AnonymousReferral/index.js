import React from "react";
import { connect } from "react-redux";
import Phone, {
  isValidPhoneNumber,
  formatPhoneNumber,
  parsePhoneNumber
} from "react-phone-number-input";
import Dropzone from "react-dropzone";

import TextFieldGroup from "utils/textFieldGroup";
import { isEmpty } from "utils/helper";
import { anonymousAgentApplication } from "./actions";
import Card from "components/Card";
import rrui from "react-phone-number-input/rrui.css";
import rpni from "react-phone-number-input/style.css";
import add_imp from "assets/img/add_imp.svg";

const style = {
  borderWidth: 2,
  borderColor: "black",
  borderStyle: "dashed",
  borderRadius: 4,
  padding: 30,
  transition: "all 0.5s"
};

const activeStyle = {
  borderStyle: "solid",
  backgroundColor: "#eee",
  borderRadius: 5
};

const mapDispatchToProps = dispatch => ({
  anonymousAgent: anonymous_agent =>
    dispatch(anonymousAgentApplication(anonymous_agent))
});

class AnonymousReferral extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        agree_terms_condition: false,
        email_offer_subscription: false,
        refer_code: `${this.props.match.params.referralid}`,
        mobile_number: "",
        country_code: "",
        agent_terms_conditions: false,
        document_name: ""
      },
      isReffered: false,
      errors: {},
      show_password: false
    };
  }
  handlePasswordChecked = () =>
    this.setState({ show_password: !this.state.show_password });

  handleTermsChecked = () => {
    this.setState({
      user: {
        ...this.state.user,
        agree_terms_condition: !this.state.user.agree_terms_condition
      }
    });
  };
  handleAgentTermsChecked = () =>
    this.setState({
      user: {
        ...this.state.user,
        agent_terms_conditions: !this.state.user.agent_terms_conditions
      }
    });

  handleSubscribtionChecked = () => {
    this.setState({
      user: {
        ...this.state.user,
        email_offer_subscription: !this.state.user.email_offer_subscription
      }
    });
  };

  handlePhoneChange(value) {
    this.setState(state => ({
      user: { ...state.user, mobile_number: value }
    }));
  }

  handleChange = e => {
    const fieldName = e.target.name;
    const label = e.target.placeholder;
    this.setState(
      {
        user: { ...this.state.user, [e.target.name]: e.target.value }
      },
      () => {
        this.validateField([{ label: label, fieldName: fieldName }]);
      }
    );
  };

  validateField = validate => {
    const errors = { ...this.state.errors };
    let hasError = false;
    validate.forEach(field => {
      const name = field["fieldName"];
      if (this.state.user[name].length === 0) {
        hasError = true;
        const label = field["label"];
        errors[name] = `${label} can't be empty`;
      } else {
        errors[name] = "";
      }
    });
    this.setState({ errors });
    return !hasError;
  };

  handleBlur = event => {
    const fieldName = event.target.name;
    const label = event.target.placeholder;
    this.validateField([{ label: label, fieldName: fieldName }]);
  };

  onDrop = files => {
    this.setState({
      user: { ...this.state.user, document_name: files }
    });
  };

  handleRemove = file => {
    const newState = this.state.user.document_name;
    if (newState.indexOf(file) > -1) {
      newState.splice(newState.indexOf(file), 1);
      this.setState({ user: { ...this.state.user, document_name: newState } });
    }
  };

  showFiles() {
    const { document_name } = this.state.user;
    return (
      <div>
        <h3>Dropped files: </h3>
        <ul className="gallery">
          {document_name.map((file, idx) => {
            return (
              <div className="col-md-3" key={idx}>
                <div className="documentName">
                  <span>{file.name}</span>
                  <span onClick={e => this.handleRemove(file)}>remove</span>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }

  handleSubmit = e => {
    const { user } = this.state;
    console.log("user", user);
    e.preventDefault();
    const localNumber = formatPhoneNumber(
      parsePhoneNumber(user.mobile_number),
      "National"
    );
    const internationalNumber = formatPhoneNumber(
      parsePhoneNumber(user.mobile_number),
      "International"
    );
    const splittedNumber = localNumber.split(/[ -]+/);
    const countryCodePos = internationalNumber.indexOf(splittedNumber[0]);
    let countryCode;
    if (internationalNumber[countryCodePos - 1] === " ") {
      countryCode = internationalNumber.substring(0, countryCodePos - 1);
    } else {
      countryCode = internationalNumber.substring(0, countryCodePos);
    }
    this.setState(
      state => ({
        user: { ...state.user, country_code: countryCode }
      }),
      () => {
        this.props.anonymousAgent(this.state.user);
      }
    );
  };

  render() {
    const { show_password, user, errors } = this.state;
    return (
      <Card cardSize="card-lg">
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-block">
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              className="form-control "
              placeholder="First Name"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            <span className="text-danger">{errors && errors.first_name}</span>
          </div>
          <div className="form-group form-block">
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              className="form-control "
              placeholder="Last Name"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            <span className="text-danger">{errors && errors.last_name}</span>
          </div>
          <div className="form-group form-block">
            <input
              type="email"
              name="email"
              value={user.email}
              className="form-control "
              placeholder="Email"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            <span className="text-danger">{errors && errors.email}</span>
          </div>
          <div className="form-group form-block">
            <input
              type={show_password ? "text" : "password"}
              name="password"
              value={user.password}
              className="form-control"
              placeholder="Password"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            <span className="text-danger">{errors && errors.password}</span>
          </div>
          <div className="form-group">
            <label className="custom-control custom-checkbox">
              <input
                className="custom-control-input"
                type="checkbox"
                required="required"
                onChange={this.handleTermsChecked}
                checked={user.agree_terms_condition}
              />
              <span className="custom-control-indicator" />

              {" "}
              <span className="custom-control-description">
                I agree the terms and conditions.
              </span>
              {" "}
              <a href="terms.html">Learn more</a>
            </label>
          </div>
          <div className="form-group">
            <label className="custom-control custom-checkbox">
              <input
                className="custom-control-input"
                type="checkbox"
                onChange={this.handleSubscribtionChecked}
                checked={user.email_offer_subscription}
              />
              <span className="custom-control-indicator" />

              {" "}
              <span className="custom-control-description">

                Subscribe for newsletter
              </span>
              {" "}
              <a href="terms.html">Learn more</a>
            </label>
          </div>
          <input
            type="text"
            name="refer_code"
            value={user.refer_code}
            className="form-control "
            placeholder="Refer Code"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <span className="text-danger">{errors && errors.refer_code}</span>
          <br />
          <Phone
            placeholder="Start typing a phone number"
            className="phone"
            value={user.mobile_number}
            onChange={(event, value) => this.handlePhoneChange(event, value)}
          />
          <br />
          {String(isValidPhoneNumber(user.mobile_number))}
          <div className="form-group">
            <label className="custom-control custom-checkbox">
              <input
                className="custom-control-input"
                type="checkbox"
                required
                onChange={this.handleAgentTermsChecked}
                checked={user.agent_terms_conditions}
              />
              <span className="custom-control-indicator" />
              <span className="custom-control-description">
                {" "}Agent Terms and Conditions
              </span>
            </label>
          </div>
          <Dropzone
            className="dropzone"
            onDrop={this.onDrop}
            style={style}
            activeStyle={activeStyle}
            multiple
            accept=".pdf, .doc*, .json"
          >
            Drop document here or <br />
            <button className="btn btn-link">Upload</button>

            {" "}
          </Dropzone>  
          {errors.document_name &&
            <p className="help-block alert alert-danger">
              {errors.document_name}
            </p>}
          <li>
            {!isEmpty(user.document_name) && this.showFiles()}
            {" "}
          </li>
          <button
            id="btnSubmit"
            className="btn btn-default btn-block btn-lg"
            type="submit"
          >
            Submit Detailskjhkljh
          </button>
        </form>
      </Card>
    );
  }
}

export default connect(null, mapDispatchToProps)(AnonymousReferral);
