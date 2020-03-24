import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 20px;
`;

export const Title = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Info = styled.View`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Status = styled.Text`
  color: ${props => (props.answered ? '#42CB59' : '#999')};
  font-size: 12px;
  font-weight: bold;
  margin-left: 5px;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 12px;
  margin-top: 4px;
`;

export const Question = styled.Text`
  color: #444;
  margin-top: 15px;
`;
