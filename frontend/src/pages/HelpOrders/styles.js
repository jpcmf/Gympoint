import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Table = styled.div`
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: middle;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;

    thead {
      tr {
        th {
          color: ${colors.dark};
          font-size: 16px;
          font-weight: bold;
          padding-bottom: 5px;
          text-align: left;
        }
      }
    }

    tbody {
      tr {
        &:last-child {
          td {
            border: 0;
          }
        }

        td {
          border-bottom: solid 1px ${colors.lightGrey};
          font-size: 16px;
          padding: 17px 0;

          &:last-child {
            width: 15%;

            @media (min-width: 1200px) {
              width: 10%;
            }
          }

          .avatar {
            display: flex;
            align-items: center;

            img {
              border: solid 1px ${colors.lightGrey};
              border-radius: 50%;
              margin-right: 16px;
              height: 30px;
              width: 30px;
            }
          }

          .actions {
            button {
              appearance: none;
              border: 0;
              color: ${colors.info};
              font-size: 16px;
              margin-left: 20px;

              &:hover {
                color: ${props => props && darken(0.09, colors.danger)};
              }
            }
          }
        }
      }
    }
  }
`;
