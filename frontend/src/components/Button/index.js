import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrapper } from './styles';

import colors from '~/styles/colors';

export default function Button({ type, icon, text, color, ...rest }) {
  return (
    <ButtonWrapper type={type} color={color} {...rest}>
      {icon && <div>{icon()}</div>}
      <span>{text}</span>
    </ButtonWrapper>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  color: colors.primary,
  icon: null,
};
