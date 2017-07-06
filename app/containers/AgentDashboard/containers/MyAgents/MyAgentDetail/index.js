import React from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { createStructuredSelector } from "reselect";

import { loadMyAgents } from "../actions";
import { selectMyAgents, selectAgent } from "../selectors";
import { isEmpty } from "utils/helper";
import styles from "assets/css/dropzone";
import ProfilePic from "assets/img/noProfile.svg";
import EarthSpinning from "assets/img/earthSpinning.svg";

const mapStateToProps = createStructuredSelector({
  agents: selectMyAgents(),
  singleAgent: selectAgent()
});

const mapDispatchToProps = dispatch => ({
  fetchAgent: () => dispatch(loadMyAgents())
});

class MyAgentDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      agent: {},
      open: false
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

  renderAgentPersonalDetail(agent) {
    // const { agent } = this.state;
    console.log("agent", agent);
    if (agent) {
      return (
        <div className="card card-view">
          <h2>Personal Info</h2>
            <label>
              First Name:
            </label>
            <div className="text">
              {agent.user_info.first_name}
            </div>
            <label>
              Last Name:
            </label>
           <div className="text-lg">
              {agent.user_info.last_name}
            </div>
            <div className="clearfix" />
            <label>
              Username:
            </label>
           <div className="text-lg">
              {agent.user_info.username}
            </div>
            <div className="clearfix" />
            <label>
              Email:
            </label>
           <div className="text-lg">
              {agent.user_info.email}
            </div>
            <div className="clearfix" />
            <label>
              Mobile Number:
            </label>
           <div className="text-lg">
              {agent.user_info.mobile_number}
            </div>
            <div className="clearfix" />
            <label>
              Status:
            </label>
           <div className="text-lg">
              {agent.user_info.agent_status}
            </div>
        </div>
      );
    }
  }

  render() {
    const { singleAgent } = this.props;
    const { agent } = this.state;
    let messageNotification;
    if (!singleAgent) {
      return (
        <div className="earth-spinning">
          <img
            src={EarthSpinning}
            className="img-responsive"
            alt="spinner"
            style={{ margin: "0 auto" }}
          />
        </div>
      );
    }
    const json = JSON.stringify(agent, null, 4);
    return (
      <div className="container">
        <h1>Agent Detail Page</h1>
        <div className="container">
          <div className="row profile">
            <div className="col-md-2">
              <div className="profile-sidebar">
                <div className="profile-userpic">
                  <img src={ProfilePic} className="img-responsive" alt="" />
                </div>
                <div className="profile-usertitle">
                  <div className="profile-usertitle-name">
                    {agent.first_name}
                    {agent.last_name}
                  </div>
                  <div className="profile-usertitle-job">
                    Agent
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="profile-content">
                <span className="text-right">
                  <h1>PROFILE</h1>
                </span>
                <h2>
                  Hello My Name is
                  {" "}
                  <strong>{`${agent.user_info.first_name} ${agent.user_info
                    .last_name}`}</strong>
                </h2>
                {this.renderAgentPersonalDetail(agent)}
              </div>
            </div>
          </div>
        </div>
        <pre>{json}</pre>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAgentDetail);
