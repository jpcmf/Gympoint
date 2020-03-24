import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
      opacity: 0.5;
    }

    img {
      background-color: #eee;
      border-radius: 50%;
      border: solid 3px #eee;
      height: 120px;
      width: 120px;
    }

    input {
      display: none;
    }
  }
`;
