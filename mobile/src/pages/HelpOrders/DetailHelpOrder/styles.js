import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 30px;
`;

// export const Container = styled.View`
//   background-color: #fff;
//   border-radius: 4px;
//   margin-bottom: 15px;
//   margin-top: 20px;
//   padding: 20px;
// `;

export const Title = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Text = styled.Text`
  color: #444;
  font-size: 14px;
  font-weight: bold;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 13px;
  margin-top: 4px;
`;

export const Content = styled.Text`
  color: #444;
  font-size: 14px;
  margin: 30px 0;
`;
