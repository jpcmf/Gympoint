import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Form, FormInput, SubmitButton } from './styles';

import Header from '~/components/Header';
import Background from '~/components/Background';

import api from '~/services/api';

export default function NewHelpOrder({ navigation }) {
  const student = useSelector(state => state.auth.student);

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    if (!question || question.length === 0) {
      Alert.alert('Falha', 'O campo pergunta não foi preenchido.');
    }

    try {
      setLoading(true);

      await api.post(`/students/${student.id}/help-orders`, { question });

      Alert.alert('Sucesso', 'Pedido de ajuda inserido com sucesso.');

      navigation.navigate('ListHelpOrders');
    } catch (error) {
      Alert.alert('Falha', 'Não foi possível adicionar o pedido de ajuda.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <Background>
      <Container>
        <Header />
        <Form>
          <FormInput
            autoCapitalize="none"
            placeholder="Inclua seu pedido de auxílio"
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
            value={question}
            onChangeText={setQuestion}
            multiline
            numberOfLines={8}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Enviar pedido
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

NewHelpOrder.navigationOptions = ({ navigation }) => ({
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

NewHelpOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
