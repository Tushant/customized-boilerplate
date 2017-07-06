import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUser } from "containers/App/selectors";
import ProfilePic from "assets/img/noProfile.svg";

class ParentPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    console.log("user");
  }

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
                <div><a href="edit-profile.html">Edit Profile</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(ParentPage);
