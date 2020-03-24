import styled from 'styled-components';

import colors from '~/styles/colors';

export const DatePicketInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  label {
    align-items: flex-start;
    color: ${colors.dark};
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: bold;
    line-height: 16px;
  }

  div.react-datepicker-wrapper {
    margin-top: 8px;
    width: 100%;
  }

  input {
    border-radius: 4px;
    border: solid 1px ${colors.grey};
    color: ${colors.dark};
    height: 45px;
    padding: 0 15px;
    width: 100%;
    font-size: 16px;

    &::placeholder {
      color: ${colors.grey};
      font-size: 16px;
      height: 19px;
      line-height: 19px;
      margin: 0 0 10px;
    }

    &:disabled {
      background-color: #f5f5f5;
    }
  }

  span {
    align-self: flex-start;
    color: ${colors.primary};
    font-weight: bold;
    margin-top: 8px;
  }
`;
