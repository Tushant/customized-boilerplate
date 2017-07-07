import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { showDialog } from "containers/App/actions";
import { logRequest, logDelete, logsDelete } from "./actions";
import { makeSelectDialog } from "containers/App/selectors";
import { selectLogs, selectLogsLoadingState } from "./selectors";
import Spinner from "assets/img/earthSpinning.svg";
import LogsDetail from "./LogsDetail";
import DeleteConfirmation from "./DeleteConfirmation";

import { isEmpty } from "utils/helper";
import EarthSpinning from "assets/img/earthSpinning.svg";
import Loader from "components/Loader";

const mapDispatchToProps = dispatch => ({
  requestLogs: () => dispatch(logRequest()),
  deleteLog: logId => dispatch(logDelete(logId)),
  deleteLogs: () => dispatch(logsDelete()),
  showDialog: dialog => dispatch(showDialog(dialog)),
  hideDialog: () => dispatch(showDialog(null))
});

const mapStateToProps = createStructuredSelector({
  logs: selectLogs(),
  isRequesting: selectLogsLoadingState(),
  dialog: makeSelectDialog()
});

class Logs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      loading: true
    };
  }
  componentDidMount() {
    // this.props.requestLogs();
    if (!this.props.logs) {
      this.props.requestLogs();
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener("", this.props.requestLogs());
  }

  handleDialog(key, logs) {
    this.setState({ show: true });
    const logsDetail = (
      <LogsDetail hideDialog={this.props.hideDialog} log={logs} />
    );
    this.props.showDialog(logsDetail);
  }

  handleDelete(key) {
    this.setState({ show: true });
    const logDeleteConfirmation = (
      <DeleteConfirmation
        hideDialog={this.props.hideDialog}
        logKey={key}
        onDelete={this.props.deleteLog}
      />
    );
    this.props.showDialog(logDeleteConfirmation);
  }

  renderLogs() {
    const { logs } = this.props;
    return logs.size > 0
      ? logs.valueSeq().map(log => {
          return (
            <div className="card" key={log.get("_id")}>
              <li className="row">
                <div className="col-md-6">
                  <a
                    onClick={() =>
                      this.handleDialog(log.get("_id"), log.get("error_stack"))}
                  >
                    {log.get("error_message")}
                  </a>
                </div>
                <div className="col-md-6 text-right">
                  <a
                    className="text-danger"
                    onClick={() => this.handleDelete(log.get("_id"))}
                  >
                    Delete
                  </a>
                </div>
              </li>
            </div>
          );
        })
      : <p>No Content</p>;
  }
  render() {
    const { logs, isRequesting } = this.props;
    console.log("logs", logs);
    // if (isRequesting.get("requesting")) {
    //   return (
    //     <div className="earth-spinning">
    //       <img src={EarthSpinning} alt="spinner" style={{ margin: "0 auto" }} />
    //     </div>
    //   );
    // }
    return (
      <div className="container">
        <div className="row mg-btm-md">
          <div className="col-xs-6"> <h1>Logs</h1></div>
          <div className="col-xs-6 text-right">
            {Boolean(logs.size) &&
              <button
                className="btn btn-danger"
                onClick={() => this.props.deleteLogs()}
              >
                Delete All Logs
              </button>}
          </div>
        </div>
        <ul className="list-group">
          {this.renderLogs()}
          {this.state.show ? this.props.dialog : null}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Loader("isRequesting")(Logs)
);
