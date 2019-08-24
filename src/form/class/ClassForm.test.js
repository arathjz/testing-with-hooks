import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import '../../../test/config';

import ClassForm from './index';

class FormView {
  constructor(wrapper) {
    this.wrapper = wrapper;
  }

  renders() {
    return this.wrapper.length === 1;
  }

  setState(state) {
    return this.wrapper.setState(state);
  }

  getState() {
    return this.wrapper.state();
  }

  instance() {
    return this.wrapper.instance();
  }
}

describe('Class component', () => {
  const mockWelcome = jest.fn();
  const mockSubmitForm = jest.fn();
  const mockRejectForm = jest.fn();

  const formData = {
    name: 'Name',
    phone: '3333333333',
    address: 'Address 123 St',
    employment: 'Software Engineer',
  };

  beforeEach(() => {
    mockWelcome.mockImplementation(fn => fn);
    mockSubmitForm.mockImplementation(fn => fn);
    mockRejectForm.mockImplementation(fn => fn);
  });

  afterEach(() => {
    mockWelcome.mockClear();
    mockSubmitForm.mockClear();
    mockRejectForm.mockClear();
  });

  const mountFormView = () => {
    const wrapper = shallow(
      <ClassForm welcome={mockWelcome} submitForm={mockSubmitForm} rejectForm={mockRejectForm} />,
    );

    return new FormView(wrapper);
  };

  it('should render', () => {
    const wrapper = mountFormView();

    expect(wrapper.renders()).to.equal(true);
  });

  it('should set form data in state', () => {
    const wrapper = mountFormView();

    wrapper.setState({ formData: formData });

    const state = wrapper.getState();

    expect(state.formData.name).to.equal('Name');
    expect(state.formData.phone).to.equal('3333333333');
    expect(state.formData.address).to.equal('Address 123 St');
    expect(state.formData.employment).to.equal('Software Engineer');
  });

  it('should call welcome when renders', () => {
    mountFormView();

    expect(mockWelcome.mock.calls).to.have.lengthOf(1);
  });

  it('should call submitForm when submit and clear form after', () => {
    const wrapper = mountFormView();

    wrapper.setState({ formData: formData });
    wrapper.instance().handleSubmit();

    expect(mockSubmitForm.mock.calls).to.have.lengthOf(1);

    const state = wrapper.getState();
    expect(Object.keys(state.formData).length).to.equal(0);
  });

  it('should call rejectForm when reject and clear form after', () => {
    const wrapper = mountFormView();

    wrapper.setState({ formData: formData });
    wrapper.instance().handleReject();

    expect(mockRejectForm.mock.calls).to.have.lengthOf(1);

    const state = wrapper.getState();
    expect(Object.keys(state.formData).length).to.equal(0);
  });
});
