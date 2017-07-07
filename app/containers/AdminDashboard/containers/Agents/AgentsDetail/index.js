import React from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { createStructuredSelector } from "reselect";

import { loadAgents, updateAgentStatus } from "../actions";
import { selectAgent, selectAgents, selectAgentResponse } from "../selectors";
import { isEmpty } from "utils/helper";
import styles from "assets/css/dropzone";
import ProfilePic from "assets/img/noProfile.svg";
import UserPic from "assets/img/pic.png";

const mapStateToProps = createStructuredSelector({
  agents: selectAgents(),
  singleAgent: selectAgent(),
  response: selectAgentResponse()
});

const mapDispatchToProps = dispatch => ({
  fetchAgent: () => dispatch(loadAgents()),
  updateAgentStatus: (status, agent, accepted, reason) =>
    dispatch(updateAgentStatus(status, agent, accepted, reason))
});

class AgentDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      agent: {},
      open: false,
      status: "verified",
      reason: "",
      accepted: [],
      rejected: [],
      document_name: []
    };
  }
  componentWillMount() {
    this.props.fetchAgent();
    if (this.props.singleAgent) {
      this.setState(state => ({
        agent: this.props.singleAgent.toJS()
      }));
    }
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (nextProps.singleAgent) {
      this.setState(state => ({
        agent: nextProps.singleAgent.toJS()
      }));
    }
  }

  handleChange(event) {
    this.setState({ status: event.target.value });
  }

  handleUnverifiedChange(event) {
    this.setState({ reason: event.target.value });
  }

  handleSubmit = event => {
    const { agent, status, accepted, reason } = this.state;
    event.preventDefault();
    // console.log("submit", agent, status, accepted);
    this.props.updateAgentStatus(status, agent, accepted, reason);
  };

  onDrop = (accepted, rejected) => {
    console.log("accepted", accepted);
    this.setState({
      accepted,
      rejected
    });
  };

  handleRemove = file => {
    const newState = this.state.accepted;
    if (newState.indexOf(file) > -1) {
      newState.splice(newState.indexOf(file), 1);
      this.setState({ accepted: newState });
    }
  };

  showFiles() {
    const { accepted } = this.state;
    return (
      <ul className="dropzone-files">
        {accepted.map((file, idx) => {
          return (
            <li key={idx}>
              <div className="alert alert-success clearfix">
                <span className="pull-left">{file.name}</span>
                <span
                  className="pull-right"
                  onClick={e => this.handleRemove(file)}
                >
                  <i className="icon-trash text-danger" />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  renderAgentPersonalDetail(agent) {
    // const { agent } = this.state;
    if (agent) {
      return (
        <div className="card card-view">

          <h2>Personal Info</h2>
          <label>
            First Name:
          </label>
          <div className="text-md mg-btm-sm">{agent.first_name}</div>

          <label>
            Last Name:
          </label>
          <div className="text-md mg-btm-sm">{agent.last_name}</div>

          <label>
            Username:
          </label>
          <div className="text-md mg-btm-sm">{agent.username}</div>

          <label>
            Email:
          </label>
          <div className="text-md mg-btm-sm">{agent.email}</div>

          <label>
            Mobile Number:
          </label>
          <div className="text-md mg-btm-sm">
            {agent.mobile_number}
          </div>
        </div>
      );
    }
  }

  renderAgentDetail(agent) {
    if (!isEmpty(agent.agent_info)) {
      return (
        <div className="card card-view">
          <a href="">
            <img
              src={UserPic}
              className="thumb-lg img-circle img-floating"
              alt="profile"
            />
          </a>
          <h2>Agent Info</h2>
          {agent.agent_info[0].refer_code &&
            <div>
              <label>
                Refer Code:
              </label>
              <div className="col-sm-5 col-xs-6 subtitle">
                {agent.agent_info[0].refer_code}
              </div>
            </div>}
          <label>
            Terms and Conditions:
          </label>
          <div className="text-md mg-btm-sm">
            {agent.agent_info[0].agent_terms_conditions ? "True" : "False"}
          </div>

          <label>
            Status:
          </label>
          <div className="text-md mg-btm-sm">
            {agent.agent_status}
          </div>
          {agent.agent_info[0].reason &&
            <div>
              <label>
                Reason:
              </label>
              <div className="text-md mg-btm-sm">
                {agent.agent_info[0].reason}
              </div>
            </div>}
        </div>
      );
    }
  }

  renderFormBasedOnStatus(status) {
    const { document_name, accepted, reason } = this.state;
    if (status === "verified") {
      return (
        <div className="status-form">
          <div className="reason-box">
            <textarea
              name="verify-reason"
              className="form-control"
              cols={4}
              rows={4}
              value={reason}
              onChange={event => this.handleUnverifiedChange(event)}
            />
          </div>
          <div className="document-uploader">
            <Dropzone
              onDrop={this.onDrop}
              style={styles.style}
              activeStyle={styles.activeStyle}
              multiple
              accept=".doc, .pdf"
            >
              Try dropping json file here or click to upload{" "}
            </Dropzone>
            <li>
              {!isEmpty(accepted) && this.showFiles()}
              {" "}
            </li>
          </div>
        </div>
      );
    } else if (status === "rejected") {
      return (
        <textarea
          cols={4}
          rows={4}
          className="form-control"
          value={reason}
          onChange={event => this.handleUnverifiedChange(event)}
        />
      );
    } else if (status === "hold") {
      return (
        <textarea
          cols={4}
          rows={4}
          className="form-control"
          value={reason}
          onChange={event => this.handleUnverifiedChange(event)}
        />
      );
    } else {
      return;
    }
  }

  render() {
    const { singleAgent, response } = this.props;
    const { agent } = this.state;
    let messageNotification;
    if (response.size || typeof response === "string") {
      messageNotification = <div>Agent Updated successfully</div>;
    }
    if (!singleAgent) {
      return (
        <div className="alert alert-success">
          Loading the content for you...
        </div>
      );
    }
    return (
      <div className="container">
        {messageNotification && messageNotification}
        <div>
          <div className="row">
            <div className="col-md-12">
              <h1>Agent Profile</h1>
              <div className="flex">

                {this.renderAgentPersonalDetail(agent)}
                {this.renderAgentDetail(agent)}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card card-md">
            <form className="form" onSubmit={this.handleSubmit}>
              <h2>Update Status</h2>
              <select
                className="form-control"
                onChange={event => this.handleChange(event)}
              >
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
                <option value="hold">On Hold</option>
              </select>
              <div className="status-meta-form" style={{ marginTop: 10 }}>
                {this.renderFormBasedOnStatus(this.state.status)}
              </div>
              <input type="submit" className="btn btn-default" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentDetail);
