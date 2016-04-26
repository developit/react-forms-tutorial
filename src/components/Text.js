import preact from 'preact';

import PropTypes from 'proptypes';

import { createComponent } from '../util.js';

import * as validators from '../validators';

export default createComponent({

  displayName: 'Text',

  propTypes: {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string)
  },

  contextTypes: {
    update: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    registerValidation: PropTypes.func.isRequired
  },

  componentWillMount() {
    this.removeValidationFromContext = this.context.registerValidation(show =>
      this.isValid(show));
  },

  componentWillUnmount() {
    this.removeValidationFromContext();
  },

  getDefaultProps() {
    return {
      validate: []
    }
  },

  getInitialState() {
    return {
      errors: []
    };
  },

  updateValue(value) {
    this.context.update(this.props.name, value);

    if (this.state.errors.length) {
      setTimeout(() => this.isValid(true), 0);
    }
  },

  onChange(event) {
    this.updateValue(event.target.value)
  },

  isValid(showErrors) {
    const errors = this.props.validate
      .reduce((memo, currentName) =>
        memo.concat(validators[currentName](
          this.context.values[this.props.name]
        )), []);

    if (showErrors) {
      this.setState({
        errors
      });
    }
    return !errors.length;
  },

  onBlur() {
    this.isValid(true);
  },

  render() {
    console.log('HII');
    return (
      <div>
      <input
        type="text"
        onChange={this.onChange}
        onBlur={this.onBlur}
        value={this.context.values[this.props.name]} />
      </div>
    );
  }
});
