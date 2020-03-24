import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 20px;

  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  background-color: #f1f1f1;
  border-radius: 25px;
  height: 50px;
  width: 50px;
`;

export const Info = styled.View`
  margin-left: 15px;
`;

export const Name = styled.Text`
  color: #333;
  font-size: 14px;
  font-weight: bold;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 13px;
  margin-top: 4px;
`;
