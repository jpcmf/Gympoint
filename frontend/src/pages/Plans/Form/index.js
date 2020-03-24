import React, { useState, useEffect, useMemo } from 'react';
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
import CurrencyInput from '~/components/CurrencyInput';

import { Content } from './styles';

import colors from '~/styles/colors';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  title: Yup.string()
    .max(200, 'O título pode conter no máximo 200 caracteres.')
    .required('Título é obrigatório.'),
  duration: Yup.number()
    .min(1, 'Duração inválida.')
    .typeError('Duração é obrigatório.')
    .required('Duração é obrigatório.'),
  price: Yup.number()
    .typeError('Preço é obrigatório.')
    .required('Preço é obrigatório.'),
  totalPrice: Yup.number(),
});

export default function PlansForm({ match }) {
  const { id } = match.params;

  const [initialData, setInitialData] = useState();
  const [loading, setLoading] = useState(false);
  const [computedPrice, setComputedPrice] = useState(0);
  const [computedDuration, setComputedDuration] = useState(1);

  const totalPrice = useMemo(() => {
    return computedPrice * computedDuration;
  }, [computedPrice, computedDuration]);

  useEffect(() => {
    document.title = 'Gympoint - Planos';

    async function loadPlan() {
      try {
        setLoading(true);

        const response = await api.get(`/plans/${id}`);

        const { data } = response;

        if (!data) throw new Error('Erro ao carregar dados do plano.');

        setInitialData(response.data);
        setComputedPrice(response.data.price);
        setComputedDuration(response.data.duration);
      } catch (error) {
        toast.error('Erro ao carregar dados do plano.');

        history.push('/plans');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadPlan();
    }
  }, [id]);

  async function handleSubmit(data) {
    if (id) {
      try {
        const { title, duration, price } = data;

        await api.put(`/plans/${id}`, { title, duration, price });

        toast.success('Plano editado com sucesso.');

        history.push('/plans');
      } catch (error) {
        toast.error('Erro ao carregar dados do plano.');
      }
    } else {
      try {
        const { title, duration, price } = data;

        await api.post(`/plans`, { title, duration, price });

        toast.success('Plano cadastrado com sucesso.');

        history.push('/plans');
      } catch (error) {
        toast.error('Não foi possível cadastrar o plano.');
      }
    }
  }

  return (
    <Form initialData={initialData} schema={schema} onSubmit={handleSubmit}>
      <Container>
        <Title>
          <h2>{id ? 'Editar plano' : 'Cadastrar plano'}</h2>
          <div>
            <Link to="/plans">
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
          <TextInput disabled={loading ? 1 : 0} name="title" label="TÍTULO" />
          <TextInput
            disabled={loading ? 1 : 0}
            name="duration"
            value={computedDuration}
            onChange={e => setComputedDuration(e.target.value)}
            type="number"
            label="DURAÇÃO (em meses)"
          />
          <CurrencyInput
            disabled={loading ? 1 : 0}
            name="price"
            value={computedPrice}
            onChange={(masked, raw) => setComputedPrice(raw)}
            label="PREÇO MENSAL"
          />
          <CurrencyInput
            disabled
            name="totalPrice"
            value={totalPrice}
            label="PREÇO TOTAL"
          />
        </Content>
      </Container>
    </Form>
  );
}

PlansForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

PlansForm.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
