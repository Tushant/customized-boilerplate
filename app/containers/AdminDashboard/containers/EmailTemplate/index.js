import React from "react";
import { fromJS } from "immutable";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import AdminEditor from "./AdminEditor";
import Dropzone from "react-dropzone";

import TextFieldGroup from "utils/textFieldGroup";
import { fetchEmailTemplate, fetchEmailTemplateByID } from "./actions";
import { selectEmailTemplate, selectEmailTemplateByID } from "./selectors";

const mapDispatchToProps = dispatch => ({
  loadEmailTemplate: () => dispatch(fetchEmailTemplate()),
  loadEmailTemplateById: id => dispatch(fetchEmailTemplateByID(id))
});

const mapStateToProps = createStructuredSelector({
  emailTemplate: selectEmailTemplate(),
  emailTemplateByID: selectEmailTemplateByID()
});

class EmailTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template_names: {},
      template: {
        template_name: {},
        email_subject: "",
        email_from: "",
        template_content: "",
        files: ""
      },
      accepted: [],
      rejected: [],
      errors: {},
      stateOfEditor: null
    };
  }

  componentDidMount() {
    this.props.loadEmailTemplate();
  }

  componentWillReceiveProps(nextProps, prevProps) {
    const { emailTemplate } = this.props;
    if (nextProps.emailTemplate !== prevProps.emailTemplate) {
      const templateNames = nextProps.emailTemplate.get("dataList").toJS();
      this.setState(state => ({
        template_names: templateNames
      }));
    }
    if (nextProps.emailTemplateByID !== prevProps.emailTemplateByID) {
      nextProps.emailTemplateByID
        .entrySeq()
        .map(([key, value]) => {
          this.setState(state => ({
            template: { ...state.template, [key]: value }
          }));
        })
        .toArray();
    }
  }

  handleChange = event => {
    const fieldName = event.target.name;
    this.setState(
      {
        template: {
          ...this.state.template,
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
      if (this.state.template[field].length === 0) {
        hasError = true;
        errors[field] = `${field} cannot be empty`;
      } else {
        errors[field] = "";
      }
    });
    this.setState({ errors });
    return !hasError;
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateField(["template_name", "email_subject", "email_from"])) {
      console.log("you can now submit the data");
      console.log("editorstate", this.state.stateOfEditor);
    }
  };

  setEditorState = stateOfEditor => this.setState({ stateOfEditor });

  onDrop = (accepted, rejected) => {
    this.setState({
      accepted,
      rejected
    });
  };

  handleRemove = file => {
    const newState = this.state.accepted;
    if (newState.indexOf(file) > -1) {
      newState.splice(newState.indexOf(file), 1);
      this.setState({ accepted: newState });
    }
  };

  showFiles() {
    const { accepted } = this.state;
    return (
      <div>
        <ul className="dropped">
          {accepted.map((file, idx) => {
            return (
              <div className="card" key={idx}>
                <li>
                  <img
                    src={file.preview}
                    className="img-fluid img-responsive hide"
                    width={200}
                    alt={file.name}
                  />
                 
                  <div className="label label-default">{file.name} 
                   <i
                    className="fa fa-remove"
                    onClick={e => this.handleRemove(file)}
                  />
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }

  handleOptionSelect(event) {
    this.props.loadEmailTemplateById(event.target.value);
  }

  renderOption = () => {
    const { template_names } = this.state;
    return template_names.map(name => {
      return (
        <option key={name._id} value={name._id}>
          {name.template_name}
        </option>
      );
    });
  };

  render() {
    const {
      errors,
      template_names,
      template,
      stateOfEditor,
      accepted
    } = this.state;
    const json = JSON.stringify(this.props.emailTemplate, null, 4);
    const attachments =
      template.attachments &&
      template.attachments.map(attachment => (
        <li key={Math.random()}>
          <img
            src={attachment}
            className="img-fluid img-responsive"
            width={200}
            alt={attachment}
          />
        </li>
      ));
    return (

      <div className="container">
      <h1>Email Template</h1>
      <form onSubmit={this.handleSubmit}>
<div className="form-group">
      <label>Email Template</label>
        <select
          className="form-control"
          onChange={event => this.handleOptionSelect(event)}
        >
          <option>
            {template_names.length > 0 ? "select" : "loading..."}
          </option>
          {template_names.length > 0 && this.renderOption()}
        </select>
        </div>
        <div className="form-group">
        <TextFieldGroup
          id="formControlsText"
          name="email_subject"
          type="text"
          value={template.email_subject}
          label="Email Subject"
          placeholder="Enter Email Subject"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          error={errors.email_subject}
          required
        />
        </div>

        <div className="form-group">
        <TextFieldGroup
          id="formControlsText"
          name="email_from"
          type="email"
          value={template.email_from}
          label="Email From"
          placeholder="Enter Email From"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          error={errors.email_from}
          required
        />
        </div>
        {template.template_content
          ? <AdminEditor
              setEditorState={this.setEditorState}
              stateOfEditor={stateOfEditor}
              name={"tushant"}
              htmlMarkup={template.template_content}
            />
          : null}

        <Dropzone
          onDrop={this.onDrop}
          className="dropzone"
          multiple
          accept=".doc, .pdf"
        >
Drop files here or<br/> <span className="btn btn-btn-link"> Upload</span>{" "}
        </Dropzone>
        {errors.accepted &&
          <p className="help-block alert alert-danger">{errors.accepted}</p>}
        {attachments && attachments}
        {accepted.length !== 0 && this.showFiles()}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            !template.template_name ||
              !template.email_subject ||
              !template.email_from ||
              !stateOfEditor
          }
        >
          Submit
        </button>
        {/* <pre>{json && json}</pre> */}
      </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplate);
