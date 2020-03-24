import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const ButtonWrapper = styled.button`
  align-items: center;
  background-color: ${props => props.color};
  border-radius: 4px;
  border: 0;
  color: ${colors.white};
  display: flex;
  height: 36px;
  transition: background-color 300ms ease;

  &:hover {
    background-color: ${props => darken(0.03, props.color)};
  }

  div {
    align-items: center;
    display: flex;
    padding: 0 8px 0 16px;

    svg {
      color: ${colors.white};
      font-size: 20px;
    }
  }

  span {
    color: ${colors.white};
    flex: 1;
    font-weight: bold;
    line-height: 19px;
    margin: 0 16px 0 0;
    text-align: center;
  }
`;
