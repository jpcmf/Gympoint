import styled from 'styled-components';

import colors from '~/styles/colors';

export const TextInputWrapper = styled.div`
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
    margin-bottom: 8px;
  }

  input,
  textarea {
    border-radius: 4px;
    border: 1px solid ${colors.grey};
    color: ${colors.dark};
    font-size: 16px;
    height: 45px;
    padding: 0 15px;
    width: 100%;

    &::placeholder {
      color: ${colors.grey};
      font-size: 16px;
      height: 19px;
      line-height: 19px;
      margin: 0 0 10px;
    }
  }

  textarea {
    height: 150px;
    padding: 15px;
  }

  span {
    align-self: flex-start;
    color: ${colors.primary};
    font-weight: bold;
    margin-top: 8px;
  }

  &.search_input {
    input {
      height: 36px;
    }
  }
`;
