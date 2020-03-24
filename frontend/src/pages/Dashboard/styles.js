import styled from 'styled-components';

import ContentWrapper from '~/components/Content';

import colors from '~/styles/colors';

export const Content = styled(ContentWrapper)`
  background-color: transparent;
  box-shadow: none;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(2, 1fr);
  padding: 0;
`;

export const Card = styled.div`
  border-radius: 4px;
  display: flex;
  background: ${colors.white};
  padding: 35px 25px;
  justify-content: space-between;
  transition: opacity 300ms ease;

  &:hover {
    opacity: 0.8;
  }

  div:first-child {
    align-items: center;
    display: flex;
    justify-content: center;

    svg {
      background-color: transparent;
      border-radius: 25px;
      color: ${colors.primary};
      font-size: 50px;
      margin-right: 10px;
      padding: 5px;
    }

    h1 {
      color: ${colors.primary};
      font-size: 18px;
      line-height: 18px;
    }
  }

  div.value {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    h1 {
      align-self: flex-end;
      color: ${colors.primary};
    }

    span {
      color: ${colors.primary};
    }
  }
`;

export const LoadingCircle = styled.div`
  border-radius: 50%;
  height: 46px;
  width: 46px;
`;

export const LoadingLine = styled.div`
  align-self: center;
  border-radius: 8px;
  height: 16px;
  width: 50%;
`;

export const LoadingContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
