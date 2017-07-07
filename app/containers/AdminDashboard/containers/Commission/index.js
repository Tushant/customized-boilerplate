import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { commissionRequest, fetchCommission } from "./actions";
import { selectCommission } from "./selectors";
import TextFieldGroup from "utils/textFieldGroup";

const Tbody = ({ roles, states, onChange, onBlur }) => {
  const row = roles.map((role, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{role.label}</td>
      <td>
        <TextFieldGroup
          id="formControlsText"
          type="number"
          name={role.name}
          className="input-sm"
          value={states.commission[role.name]}
          onChange={event => onChange(event)}
          onBlur={event => onBlur(event)}
          error={states.errors[role.name]}
          required
        />
      </td>
    </tr>
  ));
  return <tbody>{row}</tbody>;
};

const mapDispatchToProps = dispatch => ({
  setupCommission: commission => dispatch(commissionRequest(commission)),
  fetchCommission: () => dispatch(fetchCommission())
});

const mapStateToProps = createStructuredSelector({
  commissionValue: selectCommission()
});

class Commission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commission: {
        agent_commission: 0,
        agent_referral_commission: 0,
        xceltrip_commission: 0
      },
      errors: {},
      isSubmitted: false
    };
  }

  componentDidMount = () => {
    this.props.fetchCommission();
  };

  componentWillReceiveProps = (nextProps, prevProps) => {
    if (nextProps.commissionValue.size > 0) {
      nextProps.commissionValue
        .entrySeq()
        .map(([key, value]) => {
          this.setState(state => ({
            commission: { ...state.commission, [key]: value }
          }));
        })
        .toArray();
    }
  };

  handleChange = event => {
    const fieldName = event.target.name;
    this.setState(
      {
        commission: {
          ...this.state.commission,
          [event.target.name]: event.target.value
        }
      },
      () => {
        this.validateField([fieldName]);
      }
    );
  };

  handleBlur = event => {
    const fieldName = event.target.name;
    this.validateField([fieldName]);
  };

  validateField = validate => {
    const errors = { ...this.state.errors };
    let hasError = false;
    validate.forEach(field => {
      if (
        parseFloat(this.state.commission[field]) > 100 ||
        parseFloat(this.state.commission[field]) < 0
      ) {
        hasError = true;
        errors[field] = "cannot be less than 0 and more than 100";
      } else {
        errors[field] = "";
      }
    });
    this.setState({ errors });
    return !hasError;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { commission } = this.state;
    this.props.setupCommission(commission);
  };

  render() {
    const { commission } = this.state;
    const { commissionValue } = this.props;
    let messageNotification;
    if (typeof commissionValue === "string") {
      messageNotification = <div>{commissionValue}</div>;
    }
    if (commissionValue.size === 0) {
      return <div>loading content for you...</div>;
    }
    const totalCommission =
      parseFloat(commission.agent_commission) +
      parseFloat(commission.agent_referral_commission) +
      parseFloat(commission.xceltrip_commission);
    const hotel_owner_commission = parseFloat(100 - totalCommission);
    return (
      <div className="container">
        {messageNotification}

        <h1>Commission Setup</h1>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Role</th>
                <th>Commission</th>
              </tr>
            </thead>
            <Tbody
              roles={[
                { name: "agent_commission", label: "Agent" },
                { name: "agent_referral_commission", label: "Referred Agent" },
                { name: "xceltrip_commission", label: "Xceltrip" }
              ]}
              states={this.state}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />

          </table>

          <div className="row">

            <div className="col-md-6">

              Hotel Owner will be getting
              {" "}
             <div className="text-lg"> {hotel_owner_commission}</div>

            </div>

            <div className="col-md-6 align-right">

              <button
                className="btn btn-default"
                onClick={this.handleSubmit}
                disabled={hotel_owner_commission <= 0 ? true : false}
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Commission);
