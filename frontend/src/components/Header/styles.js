import styled from 'styled-components';
import { lighten } from 'polished';
import { NavLink } from 'react-router-dom';

import colors from '~/styles/colors';

export const Container = styled.header`
  background-color: #fff;
  border-bottom: solid 1px #ddd;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  height: 63px;
  justify-content: space-between;
  padding: 0 30px;

  nav {
    align-items: center;
    display: flex;

    img {
      border-right: solid 1px #ddd;
      height: 24px;
      margin-right: 20px;
      padding-right: 30px;
    }

    /* a {
      color: #999999;
      font-size: 15px;
      font-weight: bold;
      margin: 0 10px;
      transition: all 300ms ease;

      &:hover {
        color: #444;
      }
    } */
  }

  aside {
    align-items: center;
    display: flex;
  }
`;

export const ItemMenu = styled(NavLink)`
  color: ${colors.darkGrey};
  font-size: 15px;
  font-weight: bold;
  margin: 0 10px;
  transition: all 300ms ease;

  &:hover {
    color: #444;
  }
`;

export const Profile = styled.div`
  align-items: center;
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  > div {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    text-align: right;

    strong {
      display: block;
      line-height: 16px;
    }

    a {
      color: #de3b3b;
      margin-top: 3px;
      transition: all 300ms ease;

      &:hover {
        color: ${lighten(0.09, '#de3b3b')};
      }
    }
  }

  img {
    border-radius: 50%;
    height: 32px;
    width: 32px;
  }
`;
