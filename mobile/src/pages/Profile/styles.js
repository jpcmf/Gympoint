import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
`;

export const Separator = styled.View`
  background-color: rgba(255, 255, 255, 0.2);
  height: 1px;
  margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  background-color: #f64c75;
  margin-top: 10px;
`;
