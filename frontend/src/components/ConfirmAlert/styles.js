import styled, { css } from 'styled-components';

import colors from '~/styles/colors';

export const Card = styled.div`
  background: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin: 0 30px;

  &.modal-helporders {
    width: 450px;

    button {
      height: 45px;
      font-size: 16px;
    }
  }

  h1 {
    color: ${colors.dark};
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
  }

  p {
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 20px;

    strong {
      color: ${colors.dark};
    }
  }

  div {
    display: flex;
    justify-content: flex-end;
  }

  button {
    margin-top: 20px;

    ${props =>
      props.onlyConfirmButton &&
      css`
        width: 100%;
      `}
  }

  button + button {
    ${props =>
      !props.onlyConfirmButton &&
      css`
        margin-left: 10px;
      `}
  }
`;
