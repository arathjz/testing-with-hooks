import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../style.css';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  componentDidMount = () => {
    const { welcome } = this.props;

    welcome();
  };

  handleSubmit() {
    const { submitForm } = this.props;

    submitForm();
    this.clearForm();
  }

  handleReject() {
    const { rejectForm } = this.props;
    const { formData } = this.state;

    if (Object.keys(formData).length === 4) {
      rejectForm();

      this.clearForm();
    }
  }

  handleChange(event) {
    const { formData } = this.state;
    const {
      target: { id, value },
    } = event;

    this.setState({ formData: { ...formData, [id]: value } });
  }

  clearForm() {
    this.setState({ formData: {} });
  }

  render() {
    const { formData } = this.state;
    const { name, phone, address, employment } = formData;

    return (
      <form
        className="form"
        onSubmit={event => {
          event.preventDefault();
          this.handleSubmit();
        }}
      >
        <p>Javascript Class Bank</p>
        <label htmlFor="name">Name</label>
        <input
          autoComplete="off"
          type="text"
          id="name"
          required
          onChange={this.handleChange}
          value={name || ''}
        />
        <label htmlFor="phone">Phone number</label>
        <input
          autoComplete="off"
          type="text"
          id="phone"
          required
          onChange={this.handleChange}
          value={phone || ''}
        />
        <label htmlFor="address">Address</label>
        <input
          autoComplete="off"
          type="text"
          id="address"
          required
          onChange={this.handleChange}
          value={address || ''}
        />
        <label htmlFor="employment">Employment</label>
        <input
          autoComplete="off"
          type="text"
          id="employment"
          required
          onChange={this.handleChange}
          value={employment || ''}
        />
        <div>
          <button type="button" onClick={this.handleReject}>
            Rechazar
          </button>
          <button>Aprobar</button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  submitForm: PropTypes.func.isRequired,
  rejectForm: PropTypes.func.isRequired,
  welcome: PropTypes.func.isRequired,
};

export default Form;
