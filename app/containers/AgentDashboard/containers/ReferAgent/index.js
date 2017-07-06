import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { referAgent } from "../MyAgents/actions";
import ReferAgentPic from "assets/img/refer_icon.png";

const mapDispatchToProps = dispatch => ({
  referAgent: referred_agent => dispatch(referAgent(referred_agent))
});

class ReferAgent extends React.Component {
  constructor() {
    super();
    this.state = {
      refer_agent: {
        first_name: "",
        last_name: "",
        email: ""
      }
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    this.props.referAgent(this.state.refer_agent);
  };

  handleChange = event => {
    this.setState({
      refer_agent: {
        ...this.state.refer_agent,
        [event.target.name]: event.target.value
      }
    });
  };

  render() {
    const { refer_agent } = this.state;
    return (
      <Modal
        show
        onHide={() => {
          this.props.hideDialog();
        }}
      >
        <Modal.Header closeButton>
          <h2 className="text-center light">Refer Agent</h2>
        </Modal.Header>
        <p>
          Refer an agent and get an opportunity to earn more commission.
          Isn't this excite you?
          What are you waiting, then?{" "}
        </p>
        <a href="#">See Benefits</a>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-block">
            <input
              type="text"
              name="first_name"
              value={refer_agent.first_name}
              className="form-control "
              placeholder="First Name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="last_name"
              value={refer_agent.last_name}
              className="form-control "
              placeholder="Last Name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group form-block">
            <input
              type="email"
              name="email"
              value={refer_agent.email}
              className="form-control "
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
          <button
            id="btnSubmit"
            className="btn btn-default btn-block btn-lg"
            type="submit"
          >
            Refer Agent
          </button>
        </form>
      </Modal>
    );
  }
}

export default connect(null, mapDispatchToProps)(ReferAgent);
