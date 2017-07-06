import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUser } from "containers/App/selectors";
import ProfilePic from "assets/img/noProfile.svg";
import { Link } from 'react-router-dom';

class ParentPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      agent: {}
    };
  }

  componentDidMount() {
    console.log("user");
  }

  handleDialog = () => {
    const { showDialog, hideDialog } = this.props;
    this.setState({ show: !this.state.show });
    const dialog = <ReferAgent hideDialog={() => hideDialog(null)} />;
    showDialog(dialog);
  };
  render() {
    const user = JSON.parse(localStorage.getItem("user"))["userInfo"];
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="media box">
              <div className="media-left">
                <img src={ProfilePic} className="width-60" />
              </div>
              <div className="media-body">
                <span className="text-md">
                  {user.first_name} {user.last_name}
                </span>
                <span className="icon icon-tick icon-success" />
                <div><Link to="/agent/dashboard/settings">Edit Profile</Link></div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="row">
              <div className="col-lg-6">
                <div className="box bg-dark-blue">
                  <span className="text-lg">5</span>
                  <div className="bold">Hotels Listed</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="box bg-sky-blue">
                  <span className="text-lg">9</span>
                  <div className="bold">Agent Referred</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(ParentPage);
