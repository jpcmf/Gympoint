import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import { useField } from '@rocketseat/unform';

import { SelectInputWrapper } from './styles';

export default function ReactAsyncSelect({
  name,
  label,
  options,
  multiple,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.props.value;

    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <SelectInputWrapper>
      {label && (
        <label htmlFor={fieldName}>
          {label}
          <AsyncSelect
            id={fieldName}
            name={fieldName}
            aria-label={fieldName}
            cacheOptions
            defaultOptions
            loadOptions={options}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            ref={ref}
            {...rest}
          />

          {error && <span>{error}</span>}
        </label>
      )}
    </SelectInputWrapper>
  );
}

ReactAsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  options: PropTypes.func.isRequired,
};

ReactAsyncSelect.defaultProps = {
  multiple: false,
  label: null,
};
