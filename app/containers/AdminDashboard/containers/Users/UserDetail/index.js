import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { loadUsers, updateUser } from "../actions";
import { selectUser, selectUsers, selectUserResponse } from "../selectors";

const mapStateToProps = createStructuredSelector({
  users: selectUsers(),
  singleUser: selectUser(),
  response: selectUserResponse()
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(loadUsers()),
  updateUser: user => dispatch(updateUser(user))
});

class UserDetail extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      user: {},
      show: false
    };
  }
  componentWillMount() {
    this.props.fetchUser();
    if (this.props.singleUser) {
      this.setState(state => ({
        user: this.props.singleUser.toJS()
      }));
    }
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (nextProps.singleUser) {
      this.setState(state => ({
        user: nextProps.singleUser.toJS()
      }));
    }
  }

  handleChange = event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    console.log("fieldName", fieldName, event.target.value);
    this.setState(state => ({
      user: { ...state.user, [fieldName]: fieldValue }
    }));
  };

  handleActiveChecked = () =>
    this.setState(state => ({
      user: { ...state.user, active: !state.user.active }
    }));

  handleSubmit = event => {
    event.preventDefault();
    console.log("submit", this.state.user);
    this.setState({ show: !this.state.show });
    this.props.updateUser(this.state.user);
  };

  renderUserDetail(user) {
    // const { user } = this.state;
    if (user) {
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor={user.first_name}>First Name</label>
            <input
              type="text"
              id={user.first_name}
              className="form-control"
              name="first_name"
              defaultValue={user.first_name && user.first_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor={user.middle_name}>Middle Name</label>
            <input
              type="text"
              id={user.middle_name}
              className="form-control"
              name="middle_name"
              defaultValue={user.middle_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor={user.last_name}>Last Name</label>
            <input
              type="text"
              id={user.last_name}
              className="form-control"
              name="last_name"
              defaultValue={user.last_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor={user.username}>Username</label>
            <input
              type="text"
              id={user.username}
              className="form-control"
              name="username"
              defaultValue={user.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor={user.email}>Email</label>
            <input
              type="email"
              id={user.email}
              className="form-control"
              name="email"
              defaultValue={user.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label className="custom-control custom-checkbox">
              <input
                type="checkbox" className="custom-control-input"
                onChange={this.handleActiveChecked}
                checked={user.active}
              />
              <span className="custom-control-indicator" />
              <span className="custom-control-description">
                Active
              </span>
            </label>
          </div>
          <button className="btn btn-default">Save Changes</button>
        </form>
        </div>
      );
    }
  }
  render() {
    const { singleUser, response } = this.props;
    console.log("response", response);
    const { user, show } = this.state;
    const styling = show ? 'block' : 'none';
    let messageNotification;
    if (response.size || typeof response === "string") {
      messageNotification = <div style={{ display: `${styling}`}}className="alert alert-success alert-toaster">User Updated successfully</div>;
    }
    if (!singleUser) {
      return <div>Loading the content for you...</div>;
    }

    const json = JSON.stringify(user, null, 4);
    return (
      <div className="container">
        {messageNotification}
        <h1>User Detail Page</h1>
        {this.renderUserDetail(user)}
        <pre>{json}</pre>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
