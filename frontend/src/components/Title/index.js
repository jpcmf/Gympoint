import styled from 'styled-components';

import colors from '~/styles/colors';

const Title = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-height: 36px;

  h2 {
    color: #444;
    font-size: 24px;
    line-height: 28px;
  }

  div {
    align-items: center;
    display: flex;

    a + button {
      margin-left: 16px;
    }

    form {
      display: flex;
      margin-left: 16px;
      position: relative;

      input {
        padding-left: 30px;
      }

      svg {
        fill: ${colors.darkGrey};
        height: 16px;
        left: 18px;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        width: 16px;
      }
    }
  }
`;

export default Title;
