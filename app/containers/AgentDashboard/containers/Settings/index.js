import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Phone, {
  isValidPhoneNumber,
  formatPhoneNumber,
  parsePhoneNumber
} from "react-phone-number-input";
import { loadMyProfile, updateProfile } from "./actions";
import { selectMyProfile } from "./selectors";
import { isEmpty } from "utils/helper";
import ProfilePic from "assets/img/noProfile.svg";
import rrui from "react-phone-number-input/rrui.css";
import rpni from "react-phone-number-input/style.css";
import "./agentSettings.css";

const mapStateToProps = createStructuredSelector({
  myProfile: selectMyProfile()
});

const mapDispatchToProps = dispatch => ({
  loadMyProfile: () => dispatch(loadMyProfile()),
  updateProfile: (agentId, profile) => dispatch(updateProfile(agentId, profile))
});

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        _id: "",
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        mobile_number: "",
        country_code: ""
      },
      notification: "",
      agentProfile: {}
    };
  }

  componentDidMount() {
    this.props.loadMyProfile();
  }

  componentWillReceiveProps(nextProps, prevProps) {
    const agent_profile = nextProps.myProfile;
    console.log("nextProps", nextProps);
    if (nextProps.myProfile.size) {
      this.setState(state => ({
        profile: {
          ...state.profile,
          _id: agent_profile.get("_id"),
          first_name: agent_profile.get("first_name"),
          last_name: agent_profile.get("last_name"),
          email: agent_profile.get("email"),
          username: agent_profile.get("username"),
          mobile_number: agent_profile.get("mobile_number")
        },
        agentProfile: {
          ...state.agentProfile,
          submitted_documents: agent_profile.getIn([
            "agent_info",
            0,
            "submitted_documents"
          ]),
          approval_documents: agent_profile.getIn([
            "agent_info",
            0,
            "approval_documents"
          ]),
          refer_code: agent_profile.getIn(["agent_info", 0, "refer_code"])
        }
      }));
    }
    if (typeof nextProps.myProfile === "string") {
      this.setState({ notification: nextProps.myProfile });
    }
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(state => ({
      profile: { ...state.profile, [name]: value }
    }));
  };

  handlePhoneChange(value) {
    this.setState(state => ({
      profile: { ...state.profile, mobile_number: value }
    }));
  }

  validateField = validate => {
    const errors = { ...this.state.errors };
    const { profile } = this.state;
    let hasError = false;
    validate.forEach(field => {
      if (profile[field].length === 0) {
        hasError = true;
        errors[field] = `This field cannot be empty`;
      } else if (!isValidPhoneNumber(profile.mobile_number)) {
        console.log("mobile", isValidPhoneNumber(profile.mobile_number));
        hasError = true;
      } else {
        errors[field] = "";
      }
    });
    this.setState({ errors });
    return !hasError;
  };

  handleSubmit = event => {
    event.preventDefault();
    const { profile } = this.state;
    const localNumber = formatPhoneNumber(
      parsePhoneNumber(profile.mobile_number),
      "National"
    );
    const internationalNumber = formatPhoneNumber(
      parsePhoneNumber(profile.mobile_number),
      "International"
    );
    const splittedNumber = localNumber && localNumber.split(/[ -]+/);
    const countryCodePos =
      internationalNumber && internationalNumber.indexOf(splittedNumber[0]);
    let countryCode;
    if (internationalNumber[countryCodePos - 1] === " ") {
      countryCode = internationalNumber.substring(0, countryCodePos - 1);
    } else {
      countryCode = internationalNumber.substring(0, countryCodePos);
    }
    this.setState(
      state => ({
        profile: { ...state.profile, country_code: countryCode }
      }),
      () => {
        if (
          this.validateField([
            "first_name",
            "last_name",
            "username",
            "email",
            "mobile_number",
            "country_code"
          ])
        ) {
          this.props.updateProfile(
            this.props.myProfile.get("_id"),
            this.state.profile
          );
        }
      }
    );
  };

  renderSubmittedDocuments() {
    const { agentProfile } = this.state;
    return (
      <div className="white-box submitted_documents">
        <p className="text-center">Submitted Documents</p>
        {agentProfile.submitted_documents.map(document => {
          return (
            <li key={document.get("document_name")}>
              <a href={document.get("document_path")}>
                PDF
              </a>
            </li>
          );
        })}
      </div>
    );
  }

  renderApprovalDocuments() {
    const { agentProfile } = this.state;
    return (
      <div className="white-box submitted_documents">
        <p className="text-center">Approval Documents</p>
        {agentProfile.approval_documents.map(document => {
          return (
            <li key={document.get("document_name")}>
              <a href={document.get("document_path")}>
                PDF
              </a>
            </li>
          );
        })}
      </div>
    );
  }
  render() {
    const { myProfile } = this.props;
    const { profile } = this.state;
    if (isEmpty(profile)) {
      return <div>loading</div>;
    }
    const json = JSON.stringify(myProfile, null, 4);
    return (
      <div className="container">
        {this.state.notification && this.state.notification}
        <div className="agent_profile">
          <div className="col-md-4 col-xs-12">
            <div className="white-box">
              <div className="user-bg">
                <div className="overlay-box">
                  <div className="user-content">
                    <a href="">
                      <img
                        src={ProfilePic}
                        className="thumb-lg img-circle"
                        alt="img"
                      />
                    </a>
                    <h4 className="text-white">{profile.username}</h4>
                    <h5 className="text-white">{profile.username}</h5>{" "}
                  </div>
                </div>
              </div>
              <div className="user-btm-box">
                <div className="col-md-4 col-sm-4 text-center">
                  <h1>258</h1>{" "}
                </div>
                <div className="col-md-4 col-sm-4 text-center">
                  <h1>125</h1>{" "}
                </div>
                <div className="col-md-4 col-sm-4 text-center">
                  <h1>556</h1>
                </div>
              </div>
            </div>
            {this.state.agentProfile.submitted_documents &&
              this.renderSubmittedDocuments()}
            {this.state.agentProfile.approval_documents &&
              this.renderApprovalDocuments()}
          </div>
          <div className="col-md-8 col-xs-12">
            <div className="white-box">
              {this.state.agentProfile.refer_code &&
                <h1>
                  Your Refer Code is {this.state.agentProfile.refer_code}
                </h1>}
              <form
                className="form-horizontal form-material"
                onSubmit={this.handleSubmit}
              >
                <div className="row form-group">
                  <div className="col-md-6">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      className="form-control form-control-line"
                      onChange={this.handleChange}
                      value={profile.first_name}
                    />{" "}
                  </div>
                  <div className="col-md-6">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      className="form-control form-control-line"
                      value={profile.last_name}
                      onChange={this.handleChange}
                    />{" "}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label htmlFor="example-email">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-line"
                      id="example-email"
                      value={profile.email}
                      onChange={this.handleChange}
                    />{" "}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={profile.username}
                      className="form-control form-control-line"
                      onChange={this.handleChange}
                    />{" "}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label>Phone No</label>
                    <Phone
                      placeholder="Start typing a phone number"
                      className="phone"
                      name="mobile_number"
                      value={profile.mobile_number}
                      onChange={(event, value) =>
                        this.handlePhoneChange(event, value)}
                    />
                    <br />
                    {isValidPhoneNumber(profile.mobile_number)
                      ? "Number is Valid"
                      : "Not a Valid Number. Please check the country code and number format"}
                    <br />
                    <br />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <button
                      className="btn btn-default update-agent-profile"
                      disabled={
                        !profile.first_name ||
                        !profile.last_name ||
                        !profile.email ||
                        !profile.username ||
                        !profile.mobile_number ||
                        !isValidPhoneNumber(profile.mobile_number)
                      }
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
