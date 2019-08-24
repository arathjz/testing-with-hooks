import React from 'react';
import { shallow, mount } from 'enzyme';
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

  simulateInputChange(id, value) {
    return this.wrapper.find(`[id=${JSON.stringify(id)}]`).simulate('change', {
      target: {
        id,
        value,
      },
    });
  }

  inputValue(id) {
    return this.wrapper.find(`[id=${JSON.stringify(id)}]`).prop('value');
  }

  simulateSubmit() {
    return this.wrapper.find('[tid="data-form"]').simulate('submit', {
      preventDefault: fn => fn,
    });
  }

  simulateReject() {
    return this.wrapper.find('[tid="reject-button"]').simulate('click');
  }
}

describe('Class component', () => {
  const mockWelcome = jest.fn();
  const mockSubmitForm = jest.fn();
  const mockRejectForm = jest.fn();

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
      <ClassForm welcome={fn => fn} submitForm={mockSubmitForm} rejectForm={mockRejectForm} />,
    );

    return new FormView(wrapper);
  };

  it('should render', () => {
    const wrapper = mountFormView();

    expect(wrapper.renders()).to.equal(true);
  });

  it('should set formData when inputs changes', () => {
    const wrapper = mountFormView();

    wrapper.simulateInputChange('name', 'Name');
    wrapper.simulateInputChange('phone', '3333333333');
    wrapper.simulateInputChange('address', 'Address 123 St');
    wrapper.simulateInputChange('employment', 'Software Engineer');

    expect(wrapper.inputValue('name')).to.equal('Name');
    expect(wrapper.inputValue('phone')).to.equal('3333333333');
    expect(wrapper.inputValue('address')).to.equal('Address 123 St');
    expect(wrapper.inputValue('employment')).to.equal('Software Engineer');
  });

  it('should call submitForm when submit and clear form after', () => {
    const wrapper = mountFormView();

    wrapper.simulateInputChange('name', 'Name');
    wrapper.simulateInputChange('phone', '3333333333');
    wrapper.simulateInputChange('address', 'Address 123 St');
    wrapper.simulateInputChange('employment', 'Software Engineer');
    wrapper.simulateSubmit();

    expect(wrapper.inputValue('name')).to.equal('');
    expect(wrapper.inputValue('phone')).to.equal('');
    expect(wrapper.inputValue('address')).to.equal('');
    expect(wrapper.inputValue('employment')).to.equal('');
    expect(mockSubmitForm.mock.calls).to.have.lengthOf(1);
  });

  it('should call rejectForm when reject and clear form after', () => {
    const wrapper = mountFormView();

    wrapper.simulateInputChange('name', 'Name');
    wrapper.simulateInputChange('phone', '3333333333');
    wrapper.simulateInputChange('address', 'Address 123 St');
    wrapper.simulateInputChange('employment', 'Software Engineer');
    wrapper.simulateReject();

    expect(wrapper.inputValue('name')).to.equal('');
    expect(wrapper.inputValue('phone')).to.equal('');
    expect(wrapper.inputValue('address')).to.equal('');
    expect(wrapper.inputValue('employment')).to.equal('');
    expect(mockRejectForm.mock.calls).to.have.lengthOf(1);
  });

  it('should call welcome when component mounts', () => {
    mount(<ClassForm welcome={mockWelcome} submitForm={fn => fn} rejectForm={fn => fn} />);

    expect(mockWelcome.mock.calls).to.have.lengthOf(1);
  });
});
