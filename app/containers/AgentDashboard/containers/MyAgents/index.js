import React from "react";
import { connect } from "react-redux";
import NavLink from "react-router-dom/NavLink";
import { createStructuredSelector } from "reselect";
import BootstrapTable from "react-bootstrap-table/lib/BootstrapTable";
import TableHeaderColumn from "react-bootstrap-table/lib/TableHeaderColumn";
import ReferAgent from "../ReferAgent";
import { loadMyAgents } from "./actions";
import { selectMyAgents } from "./selectors";

import { makeSelectDialog } from "containers/App/selectors";
import { showDialog } from "containers/App/actions";
import EarthSpinning from "assets/img/earthSpinning.svg";

import { isEmpty } from "utils/helper";

const mapDispatchToProps = dispatch => ({
  fetchAgents: () => dispatch(loadMyAgents()),
  showDialog: dialog => dispatch(showDialog(dialog)),
  hideDialog: () => dispatch(showDialog(null))
});
const mapStateToProps = createStructuredSelector({
  dialog: makeSelectDialog(),
  myAgents: selectMyAgents()
});
class MyAgents extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      agents: {},
      show: false
    };
  }
  componentDidMount() {
    this.props.fetchAgents();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.myAgents) {
      nextProps.myAgents
        .entrySeq()
        .map(([key, value]) =>
          this.setState(state => ({
            agents: { ...state.agents, [key]: value }
          }))
        )
        .toArray();
    }
  }
  handleDialog = () => {
    const { showDialog, hideDialog } = this.props;
    this.setState(state => ({ show: true }));
    const dialog = <ReferAgent hideDialog={() => hideDialog(null)} />;
    showDialog(dialog);
  };
  editFormatter = (cell, row) => {
    return (
      <div className="action">
        <NavLink
          className="btn btn-default"
          to={`/agent/dashboard/my-agent/${cell}`}
        >
          <i className="icon-eye" />
        </NavLink>
      </div>
    );
  };
  showFirstName = (cell, row) => {
    return `${cell.first_name} ${cell.last_name}`;
  };
  showEmail = (cell, row) => {
    return cell.email;
  };
  showStatus = (cell, row) => {
    return cell.agent_status;
  };
  render() {
    const { myAgents } = this.props;
    const options = {
      afterDeleteRow: this.onAfterDeleteRow,
      sizePerPage: 1,
      sizePerPageList: [1, 2, 3]
    };
    const selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      className: "custom-select-class",
      bgColor: "#2863a0",
      color: "#fff"
    };
    if (!myAgents.size) {
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
    return (
      <div className="container">
        <div className="block bg-sky-blue">
          <div className="row">
            <div className="col-md-9 media">
              <div className="media-left">
                <i className="icon-person-add xlg" />
              </div>
              <div className="media-body">
                <h2 className="light">
                  Refer today, <br />
                  Get your % forever
                </h2>
                <a className="bold" href="#">See Benefits</a>
              </div>
            </div>
            <div className="col-md-3">
              <a
                className="btn btn-outline bg-sky-blue btn-lg mg-top-md bold"
                onClick={() => this.handleDialog()}
              >
                Refer Agent
              </a>
            </div>
          </div>
        </div>
        {this.state.show ? this.props.dialog : null}
        <BootstrapTable
          data={myAgents.toJS()}
          options={options}
          pagination
          striped
          hover
        >
          <TableHeaderColumn
            dataField="user_info"
            dataSort
            dataFormat={this.showFirstName}
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="user_info" dataFormat={this.showEmail}>
            Email
          </TableHeaderColumn>
          <TableHeaderColumn dataField="user_info" dataFormat={this.showStatus}>
            Status
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="user_id"
            isKey
            dataFormat={this.editFormatter}
          >
            Action
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAgents);
