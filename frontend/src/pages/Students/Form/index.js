import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { MdArrowBack, MdSave } from 'react-icons/md';

import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import Title from '~/components/Title';
import Button from '~/components/Button';
import Container from '~/components/Container';
import TextInput from '~/components/TextInput';

import { Content } from './styles';

import colors from '~/styles/colors';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(200, 'O nome pode conter no máximo 200 caracteres.')
    .required('Nome é obrigatório.'),
  email: Yup.string()
    .email('Insira um e-mail válido.')
    .max(200, 'O e-mail pode conter no máximo 200 caracteres.')
    .required('Email é obrigatório.'),
  age: Yup.string().required('Data de nascimento é obrigatório.'),
  weight: Yup.number()
    .typeError('Peso é obrigatório.')
    .required('Peso é obrigatório.'),
  height: Yup.number()
    .typeError('Altura é obrigatório.')
    .required('Altura é obrigatório.'),
});

export default function StudentsForm({ match }) {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState();
  const { id } = match.params;

  useEffect(() => {
    document.title = 'Gympoint - Alunos';
  }, []);

  useEffect(() => {
    async function loadStudent() {
      try {
        setLoading(true);

        const response = await api.get(`/students/${id}`);

        const { data } = response;

        setInitialData(data);
      } catch (error) {
        toast.error('Não foi possível carregar os dados do aluno.');

        history.push('/students');
      }

      setLoading(false);
    }

    if (id) {
      loadStudent();
    }
  }, [id]);

  async function handleSubmit(data) {
    if (id) {
      try {
        const { name, email, age, weight, height } = data;

        await api.put(`students/${id}`, { name, email, age, weight, height });

        toast.success('Aluno editado com sucesso.');

        history.push('/students');
      } catch (error) {
        toast.error('Não foi possível cadastrar o aluno.');
      }
    } else {
      try {
        const { name, email, age, weight, height } = data;

        await api.post(`students`, { name, email, age, weight, height });

        toast.success('Aluno cadastrado com sucesso.');

        history.push('/students');
      } catch (error) {
        toast.error('Não foi possível cadastrar o aluno.');
      }
    }
  }

  return (
    <Form initialData={initialData} schema={schema} onSubmit={handleSubmit}>
      <Container>
        <Title>
          <h2>{id ? 'Editar aluno' : 'Cadastrar aluno'}</h2>
          <div>
            <Link to="/students">
              <Button
                icon={MdArrowBack}
                type="button"
                text="VOLTAR"
                color={colors.darkGrey}
              />
            </Link>
            <Button
              icon={MdSave}
              disabled={loading ? 1 : 0}
              type="submit"
              text={id ? 'EDITAR' : 'CADASTRAR'}
            />
          </div>
        </Title>
        <Content>
          <TextInput
            disabled={loading ? 1 : 0}
            name="name"
            label="NOME COMPLETO"
            placeholder="John Paul"
          />
          <TextInput
            disabled={loading ? 1 : 0}
            name="email"
            label="ENDEREÇO DE E-MAIL"
            placeholder="exemplo@email.com"
          />
          <TextInput disabled={loading ? 1 : 0} name="age" label="IDADE" />
          <TextInput
            disabled={loading ? 1 : 0}
            name="weight"
            type="number"
            label="PESO (em kg)"
            step="0.01"
          />
          <TextInput
            disabled={loading ? 1 : 0}
            name="height"
            type="number"
            label="ALTURA"
            step="0.01"
          />
        </Content>
      </Container>
    </Form>
  );
}

StudentsForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

StudentsForm.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
