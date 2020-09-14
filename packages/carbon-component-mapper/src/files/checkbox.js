import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import MultipleChoiceListCommon from '@data-driven-forms/common/src/multiple-choice-list';

import { Checkbox as CarbonCheckbox, FormGroup } from 'carbon-components-react';

import WithDescription from '../common/with-description';
import prepareProps from '../common/prepare-props';

const Wrapper = ({ label, description, children }) => (
  <FormGroup legendText={description ? <WithDescription labelText={label} description={description} /> : label}>{children}</FormGroup>
);

Wrapper.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node,
  description: PropTypes.node
};

const SingleCheckbox = (props) => {
  const { input, ...rest } = useFieldApi(prepareProps({ ...props, type: 'checkbox' }));

  return <CarbonCheckbox {...input} id={input.name} {...rest} />;
};

const SingleCheckboxInCommon = ({ label, isDisabled, id, ...props }) => <CarbonCheckbox id={id} labelText={label} disabled={isDisabled} />;

SingleCheckboxInCommon.propTypes = {
  label: PropTypes.node,
  input: PropTypes.object,
  isDisabled: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string
};

const Checkbox = ({ options, ...props }) =>
  options ? (
    <MultipleChoiceListCommon options={options} {...props} Wrapper={Wrapper} Checkbox={SingleCheckboxInCommon} />
  ) : (
    <SingleCheckbox {...props} />
  );

Checkbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node, value: PropTypes.any }))
};

export default Checkbox;
