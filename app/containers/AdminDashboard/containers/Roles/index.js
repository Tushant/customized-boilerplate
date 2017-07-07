import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchRoles } from "./actions";
import { selectRoles } from "./selectors";
import Spinner from "assets/img/earthSpinning.svg";

const mapDispatchToProps = dispatch => ({
  requestRoles: () => dispatch(fetchRoles())
});

const mapStateToProps = createStructuredSelector({
  roles: selectRoles()
});

class Role extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.requestRoles();
  }
  render() {
    const { roles } = this.props;
    if (roles.size === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
      <h1>Role</h1>
        <ul className="cards">
          {roles
            .valueSeq()
            .map(role => {
              return <li className="" key={role.get("_id")}>
              <div className="card card-sm card-color-top">{role.get("role_name")}
              </div>
              </li>;
            })
            .toList()
            .toJS()}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role);
