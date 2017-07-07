import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Phone, {
  isValidPhoneNumber,
  formatPhoneNumber,
  parsePhoneNumber
} from "react-phone-number-input";
import Dropzone from "react-dropzone";
import TextFieldGroup from "utils/textFieldGroup";
import { agentApplicationRequest } from "./actions";
import {
  selectAgentApplication,
  selectAgentApplicationError,
  selectAgentApplicationResponse
} from "./selectors";
import rrui from "react-phone-number-input/rrui.css";
import rpni from "react-phone-number-input/style.css";

import add_imp from "assets/img/add_imp.svg";

const mapDispatchToProps = dispatch => ({
  applyForAgent: agents => dispatch(agentApplicationRequest(agents))
});

const mapStateToProps = createStructuredSelector({
  agents: selectAgentApplication(),
  serverErrors: selectAgentApplicationError(),
  serverResponse: selectAgentApplicationResponse()
});

class AppyForAgent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      agent_info: {
        refer_code: "",
        mobile_number: "",
        country_code: "",
        agent_terms_conditions: false,
        documents: ""
      },
      isReffered: false,
      errors: {}
    };
  }

  handleChange = event => {
    const fieldName = event.target.name;
    this.setState({
      agent_info: {
        ...this.state.agent_info,
        [event.target.name]: event.target.value
      }
    });
  };

  handleTermsChecked = () =>
    this.setState({
      agent_info: {
        ...this.state.agent_info,
        agent_terms_conditions: !this.state.agent_info.agent_terms_conditions
      }
    });
  handleSelfApplyCheck = () =>
    this.setState({ isReffered: !this.state.isReffered });

  handleSubmit = event => {
    const { agent_info } = this.state;
    event.preventDefault();
    const localNumber = formatPhoneNumber(
      parsePhoneNumber(agent_info.mobile_number),
      "National"
    );
    const internationalNumber = formatPhoneNumber(
      parsePhoneNumber(agent_info.mobile_number),
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
    console.log("this.state.agent_info", agent_info);
    this.setState(
      state => ({
        agent_info: { ...state.agent_info, country_code: countryCode }
      }),
      () => {
        this.props.applyForAgent(this.state.agent_info);
      }
    );
  };

  handlePhoneChange(value) {
    this.setState(state => ({
      agent_info: { ...state.agent_info, mobile_number: value }
    }));
  }

  onDrop = files => {
    this.setState({
      agent_info: {
        ...this.state.agent_info,
        documents: files
      }
    });
  };

  render() {
    const { errors, agent_info, isReffered } = this.state;
    const { serverErrors, serverResponse } = this.props;
    const errorNotification = serverErrors && serverErrors.get("data")
      ? serverErrors.get("data")
      : null;
    const successNotification = serverResponse && serverResponse.get("data")
      ? serverResponse.get("data")
      : null;
    return (
      <div className="container">
        <div className="message-block">
          {errorNotification}
          {successNotification}
        </div>
        <div className="col-sm-4">
          <div className="card">
            <h2>Apply for IMP</h2>
            <div className="form-group">
              <label className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  onChange={this.handleSelfApplyCheck}
                  checked={isReffered}
                  style={{ marginBottom: "20px" }}
                />
                <span className="custom-control-indicator" />
                <span className="custom-control-description">
                  {" "}I have refer code.
                </span>
              </label>

            </div>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              {isReffered
                ? <TextFieldGroup
                    id="formControlsText"
                    name="refer_code"
                    value={agent_info.refer_code}
                    type="text"
                    label="Refer Code"
                    placeholder="Refer Code"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    error={errors.refer_code}
                  />
                : null}
              <Phone
                placeholder="Start typing a phone number"
                className="phone"
                value={agent_info.mobile_number}
                onChange={(event, value) =>
                  this.handlePhoneChange(event, value)}
              />
              <br />
              {agent_info.mobile_number
                ? isValidPhoneNumber(agent_info.mobile_number)
                  ? "Number is valid"
                  : "Number is not a valid. Please check country code and the format of number."
                : null}
              <label>Upload following documents</label>
              <ul>
                <li>1. Official Proof of citizen</li>
                <li>2. Recent Photo</li>
                <li>3. Resume</li>
              </ul>
              <Dropzone className="dropzone" onDrop={this.onDrop} multiple accept=".pdf">
                Drop files here or <br/><span className="btn btn-link">upload</span>{" "}
              </Dropzone>
              {errors.documents &&
                <p className="help-block alert alert-danger">
                  {errors.documents}
                </p>}
              {agent_info.documents &&
                Array.isArray(agent_info.documents) &&
                <ul className="dropped">
                  {agent_info.documents.map((file, i) =>
                    <li key={i}>{file.name}</li>
                  )}
                </ul>}
              <div className="form-group">
                <label className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    required
                    onChange={this.handleTermsChecked}
                    checked={agent_info.agent_terms_conditions}
                  />
                  <span className="custom-control-indicator" />
                  <span className="custom-control-description">
                    {" "} I accept terms and conditions.
                  </span>
                </label>
              </div>
              <button
                className="btn btn-default"
                disabled={
                  !isValidPhoneNumber(agent_info.mobile_number) ||
                  !agent_info.agent_terms_conditions
                }
              >
                Submit Details
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppyForAgent);