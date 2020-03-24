import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  align-items: center;
  background-color: #ee4d64;
  display: flex;
  height: 100%;
  justify-content: center;
`;

export const Content = styled.div`
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-10%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  animation: 1s ease-out 0s 1 slideInFromLeft;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 360px;
  padding: 50px 30px;
  text-align: center;
  width: 100%;

  img {
    margin-bottom: 10px;
    max-width: 153px;
  }

  form {
    display: flex;
    flex-direction: column;

    .form__group {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      label {
        color: #444444;
        font-weight: bold;
        margin-bottom: 8px;
      }

      input {
        border-radius: 4px;
        border: solid 1px #ddd;
        font-size: 16px;
        height: 45px;
        padding: 0 15px;
        width: 100%;

        &::placeholder {
          color: #999999;
        }
      }

      span {
        animation: 300ms ease-out 0s 1 slideInFromLeft;
        color: ${darken(0.03, '#ee4d64')};
        align-self: flex-start;
        margin-top: 5px;
        font-size: 11px;
        font-weight: bold;
      }
    }

    button {
      background-color: #ee4d64;
      border-radius: 4px;
      border: 0;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      height: 45px;
      margin-top: 15px;
      transition: background-color 300ms ease;

      &:hover {
        background-color: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
