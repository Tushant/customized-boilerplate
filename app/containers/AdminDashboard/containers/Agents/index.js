import React from "react";
import BootstrapTable from "react-bootstrap-table/lib/BootstrapTable";
import TableHeaderColumn from "react-bootstrap-table/lib/TableHeaderColumn";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { loadAgents, deleteAgent, updateAgentStatus } from "./actions";
import { selectAgents, selectAgentResponse } from "./selectors";

const status = ["Verified", "Hold", "Rejected"];

const mapDispatchToProps = dispatch => ({
  fetchAgent: () => dispatch(loadAgents()),
  updateStatus: (status, agent) => dispatch(updateAgentStatus(status, agent)),
  deleteAgent: agentId => dispatch(deleteAgent(agentId))
});

const mapStateToProps = createStructuredSelector({
  agents: selectAgents(),
  response: selectAgentResponse()
});

class AgentsList extends React.Component {
  constructor() {
    super();
    this.state = {
      status: {}
    };
  }
  componentDidMount() {
    this.props.fetchAgent();
  }

  deleteRow(cell) {
    if (cell) {
      this.props.deleteAgent(cell);
    }
  }

  updateStatus(e, status, row) {
    e.preventDefault();
    this.props.updateStatus(status, row);
  }

  editFormatter = (cell, row) => {
    return (
      <div className="actions">
        <Link
          to={`/admin/dashboard/agent/${cell}`}
          className="btn btn-default has-icon"
        >
          <i className="icon-eye" />
        </Link>
      </div>
    );
  };

  render() {
    const { agents, response } = this.props;
    const options = {
      afterDeleteRow: this.onAfterDeleteRow,
      sizePerPage: 5,
      sizePerPageList: [5, 10, 15]
    };
    let messageNotification;
    if (response.size) {
      messageNotification = (
        <div className="alert alert-success">User deleted successfully</div>
      );
    }
    if (agents.size === 0) {
      return <div>loading</div>;
    }
    const selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      className: "custom-select-class",
      bgColor: "#2863a0",
      color: "#fff"
    };
    return (
      <div className="container">
        {messageNotification}

        <div className="row">
          <div className="col-md-6">
            <h1>List of IMP's</h1>
          </div>
          <div className="col-md-6" />
        </div>

        <BootstrapTable
          data={agents.toJS()}
          options={options}
          pagination
          striped
          hover
          search
        >

          <TableHeaderColumn dataField="first_name" dataSort>
            <b>First Name</b>
          </TableHeaderColumn>
          <TableHeaderColumn dataField="email">
            Email
          </TableHeaderColumn>
          <TableHeaderColumn dataField="user_role" dataSort>
            Role
          </TableHeaderColumn>
          <TableHeaderColumn dataField="agent_status">
            Status
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="_id"
            isKey
            dataFormat={this.editFormatter}
          >
            Actions
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentsList);
