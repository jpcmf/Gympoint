import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const NewHelpOrder = styled(Button)`
  margin: 20px 30px 0 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#ee4e62',
  size: 50,
})`
  align-items: center;
  flex: 1;
  justify-content: center;
  margin-top: 20px;
`;
