// src/components/SubmitButton.js

import preact from 'preact';

import PropTypes from 'proptypes';

import { createComponent } from '../util.js';

export default createComponent({

  displayName: 'SubmitButton',

  propTypes: {
    label: PropTypes.string
  },

  contextTypes: {
    isFormValid: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      label: 'Submit'
    };
  },

  render() {
    return (
      <button disabled={!this.context.isFormValid()}>
        {this.props.label}
      </button>
    );
  }
});
