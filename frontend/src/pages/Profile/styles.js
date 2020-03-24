import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Wrapper = styled.div`
  margin: 30px auto;
  max-width: 900px;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-height: 36px;

  h2 {
    color: #444;
    font-size: 24px;
    line-height: 28px;
  }

  .actions {
    button {
      align-items: center;
      background-color: #ee4d64;
      border-radius: 4px;
      border: 0;
      color: #fff;
      display: flex;
      font-size: 14px;
      font-weight: bold;
      height: 36px;
      padding: 0 16px;
      transition: background-color 300ms ease;

      &:hover {
        background-color: ${darken(0.03, '#ee4d64')};
      }

      svg {
        margin-right: 8px;
      }
    }
  }
`;

export const Container = styled.div`
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

  background-color: #fff;
  border-radius: 4px;
  margin-top: 20px;
  padding: 30px;

  form {
    display: flex;
    flex-direction: column;

    .form__group {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

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

    hr {
      border: 0;
      height: 1px;
      background-color: ${lighten(0.09, '#ddd')};
      margin: 20px 0 30px;
    }
  }
`;
