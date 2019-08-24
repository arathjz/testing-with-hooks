import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import '../style.css';

const Form = ({ submitForm, rejectForm, welcome }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    welcome();
  }, [welcome]);

  const handleSubmit = event => {
    event.preventDefault();
    submitForm();
    clearForm();
  };

  const handleReject = () => {
    if (Object.keys(formData).length === 4) {
      rejectForm();
      clearForm();
    }
  };

  const handleChange = event => {
    const {
      target: { id, value },
    } = event;

    setFormData({ ...formData, [id]: value });
  };

  const clearForm = () => setFormData({});

  const { name, phone, address, employment } = formData;

  return (
    <form className="form" onSubmit={handleSubmit} tid="data-form">
      <p>Javascript Hooks Bank</p>
      <label htmlFor="name">Name</label>
      <input
        autoComplete="off"
        type="text"
        id="name"
        required
        onChange={handleChange}
        value={name || ''}
      />
      <label htmlFor="phone">Phone number</label>
      <input
        autoComplete="off"
        type="text"
        id="phone"
        required
        onChange={handleChange}
        value={phone || ''}
      />
      <label htmlFor="address">Address</label>
      <input
        autoComplete="off"
        type="text"
        id="address"
        required
        onChange={handleChange}
        value={address || ''}
      />
      <label htmlFor="employment">Employment</label>
      <input
        autoComplete="off"
        type="text"
        id="employment"
        required
        onChange={handleChange}
        value={employment || ''}
      />
      <div>
        <button tid="reject-button" type="button" onClick={handleReject}>
          Rechazar
        </button>
        <button>Aprobar</button>
      </div>
    </form>
  );
};

Form.propTypes = {
  submitForm: PropTypes.func.isRequired,
  rejectForm: PropTypes.func.isRequired,
  welcome: PropTypes.func.isRequired,
};

export default Form;
