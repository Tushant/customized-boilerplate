import React from "react";
import { Link } from "react-router-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { showDialog } from "containers/App/actions";
import { makeSelectDialog } from "containers/App/selectors";
import { loadUsers, deleteUser } from "./actions";
import { selectUsers, selectUserResponse } from "./selectors";
import DeleteConfirmation from "components/DeleteConfirmation";

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(loadUsers()),
  deleteUser: userId => dispatch(deleteUser(userId)),
  showDialog: dialog => dispatch(showDialog(dialog)),
  hideDialog: () => dispatch(showDialog(null))
});

const mapStateToProps = createStructuredSelector({
  users: selectUsers(),
  response: selectUserResponse(),
  dialog: makeSelectDialog()
});

// TODO change confirmed true/false to <span className="icon-tick"><span> or
// <span className="icon-close"><span>

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }
  componentDidMount() {
    this.props.fetchUser();
  }

  deleteRow(cell) {
    console.log("cell", cell);
    this.setState({ show: true });
    if (cell) {
      const userDeleteConfirmation = (
        <DeleteConfirmation
          hideDialog={this.props.hideDialog}
          deleteKey={cell}
          onDelete={this.props.deleteUser}
        />
      );
      this.props.showDialog(userDeleteConfirmation);
      // this.props.deleteUser(cell);
    }
  }

  editFormatter = (cell, row) => {
    return (
      <div className="actions">
        <Link className="btn btn-default" to={`/admin/dashboard/user/${cell}`}>
          <span className="icon-eye" />
        </Link>
        <span className="btn" onClick={() => this.deleteRow(cell)}>
          <i className="icon-trash" />
        </span>
      </div>
    );
  };

  render() {
    const options = {
      afterDeleteRow: this.onAfterDeleteRow,
      sizePerPage: 5,
      sizePerPageList: [5, 10, 15]
    };
    const { users, response } = this.props;
    let messageNotification;
    if (response.size) {
      messageNotification = (
        <div className="alert alert-success">User deleted successfully</div>
      );
    }
    if (users.size === 0) {
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
        {this.state.show ? this.props.dialog : null}
        <h1>Users</h1>
        <BootstrapTable
          data={users.toJS()}
          options={options}
          pagination
          striped
          hover
          search
        >

          <TableHeaderColumn dataField="first_name" dataSort>
            First Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="email">
            Email
          </TableHeaderColumn>
          <TableHeaderColumn dataField="user_role">
            Role
          </TableHeaderColumn>
          <TableHeaderColumn dataField="confirmed">
            Confirmed
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
