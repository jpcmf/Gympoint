import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 60px 0 30px;
`;

export const DateButton = styled.TouchableOpacity`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  height: 46px;
  margin: 0 30px;
  padding: 0 15px;
`;

export const DateText = styled.Text`
  color: #fff;
  font-size: 14px;
  margin-left: 15px;
`;

export const Picker = styled.View`
  background-color: #fff;
  margin-top: 15px;
  padding: 15px 30px;
`;
