import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 0 30px;
`;

export const Avatar = styled.Image`
  background-color: #f1f1f1;
  padding: 3px;
  border-radius: 60px;
  height: 120px;
  width: 120px;
`;

export const Name = styled.Text`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

export const Time = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  margin-top: 4px;
`;

export const SubmitButton = styled(Button)`
  align-self: stretch;
  margin-top: 20px;
`;
