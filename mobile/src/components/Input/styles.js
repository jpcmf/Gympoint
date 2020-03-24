import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  border: solid 1px #ddd;
  border-radius: 4px;
  height: 46px;
  padding: 0 15px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  color: #444;
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
`;
