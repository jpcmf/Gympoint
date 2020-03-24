import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Title, Text, Time, Content } from './styles';

import Header from '~/components/Header';
import Background from '~/components/Background';

export default function DetailHelpOrder({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  const dateFormatted = useMemo(() => {
    return formatRelative(
      parseISO(helpOrder.answer_at ? helpOrder.answer_at : helpOrder.createdAt),
      new Date(),
      {
        locale: pt,
        addSuffix: true,
      }
    );
  }, [helpOrder.answer_at, helpOrder.createdAt]);

  const answered = useMemo(() => !!helpOrder.answer_at, [helpOrder.answer_at]);

  return (
    <Background>
      <Container>
        <Header />
        <Title>
          <Text>Pergunta</Text>
          <Time>{dateFormatted}</Time>
        </Title>
        <Content>{helpOrder.question}</Content>
        <Title>
          <Text>Resposta</Text>
        </Title>
        <Content>
          {answered ? helpOrder.answer : 'Não foi respondido ainda.'}
        </Content>
      </Container>
    </Background>
  );
}

DetailHelpOrder.navigationOptions = ({ navigation }) => ({
  title: false,
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ListHelpOrders');
      }}
    >
      <Icon name="chevron-left" size={20} color="#ee4e62" />
    </TouchableOpacity>
  ),
});

DetailHelpOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
