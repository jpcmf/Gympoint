import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { MdArrowBack, MdSave } from 'react-icons/md';

import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { formatDistanceStrict, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { formatPrice } from '~/util/format';

import Title from '~/components/Title';
import Button from '~/components/Button';
import Container from '~/components/Container';
import SelectInput from '~/components/SelectInput';
// import ReactAsyncSelect from '~/components/AsyncSelect';
import CurrencyInput from '~/components/CurrencyInput';
import DatePickerInput from '~/components/DatePickerInput';

import { Content } from './styles';

import colors from '~/styles/colors';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .typeError('Aluno é obrigatório.')
    .required('Aluno é obrigatório.'),
  plan_id: Yup.number()
    .typeError('Plano é obrigatório.')
    .required('Plano é obrigatório.'),
  start_date: Yup.date().required('Data de início é obrigatória.'),
});

export default function RegistrationsForm({ match }) {
  const { id } = match.params;

  const [initialData, setInitialData] = useState();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);

  const [selectedPlan, setSelectedPlan] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState();

  const endDate = useMemo(() => {
    return addMonths(selectedStartDate, selectedPlan.duration);
  }, [selectedPlan, selectedStartDate]);

  const totalPrice = useMemo(() => {
    if (selectedPlan.total_price !== undefined) {
      return selectedPlan.total_price;
    }
  }, [selectedPlan.total_price]);

  const loadStudents = useCallback(async inputValues => {
    try {
      setLoading(true);

      const response = await api.get('students', {
        params: {
          q: inputValues,
        },
      });

      const data = response.data.map(student => ({
        id: student.id,
        title: student.name,
      }));

      setStudents(data);

      return data;
    } catch (_) {
      return toast.error('Erro ao carregar os alunos.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPlans = useCallback(async inputValue => {
    try {
      setLoading(true);

      const response = await api.get('/plans', {
        params: {
          q: inputValue,
        },
      });

      const data = response.data.map(plan => {
        const formattedTitle = `${plan.title} - ${formatPrice(
          plan.price
        )}/mês por ${formatDistanceStrict(
          addMonths(new Date(), plan.duration),
          new Date(),
          { locale: pt }
        )}`;

        return {
          id: plan.id,
          title: formattedTitle,
          total_price: plan.price * plan.duration,
          duration: plan.duration,
        };
      });

      setPlans(data);

      return data;
    } catch (_) {
      toast.error('Erro ao carregar os planos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'GymPoint - Matrículas';
  }, []);

  useEffect(() => {
    async function loadRegistration() {
      try {
        setLoading(true);

        const response = await api.get(`/registrations/${id}`);

        const { data: registration } = response;

        const formattedTitle = `${registration.plan.title} - ${formatPrice(
          registration.plan.price
        )}/mês por ${formatDistanceStrict(
          addMonths(new Date(), registration.plan.duration),
          new Date(),
          { locale: pt }
        )}`;

        setPlans([...plans, { ...registration.plan, title: formattedTitle }]);

        setStudents([
          ...students,
          {
            id: registration.student.id,
            name: registration.student.name,
            title: registration.student.name,
          },
        ]);

        setSelectedPlan({
          id: registration.plan.id,
          title: registration.plan.title,
          duration: registration.plan.duration,
          total_price: registration.price,
        });

        setSelectedStartDate(parseISO(registration.start_date));

        if (!registration)
          throw new Error('Erro ao carregar dados da matrícula.');

        setInitialData({
          start_date: parseISO(registration.start_date),
          student_id: registration.student.id,
          plan_id: registration.plan.id,
        });
      } catch (_) {
        toast.error('Erro ao carregar dados da matrícula.');

        history.push('/registrations');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadRegistration();
    }

    loadPlans();
  }, [id]); //eslint-disable-line

  async function handleSubmit(data) {
    if (id) {
      try {
        setLoading(true);

        const { student_id, plan_id, start_date } = data;

        await api.put(`/registrations/${id}`, {
          student_id,
          plan_id,
          start_date,
        });

        toast.success('Matrícula editada com sucesso.');

        history.push('/registrations');
      } catch (error) {
        toast.error('Erro ao carregar dados da matrícula.');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const { student_id, plan_id, start_date } = data;

        await api.post(`/registrations`, { student_id, plan_id, start_date });

        toast.success('Matrícula cadastrada com sucesso.');

        history.push('/registrations');
      } catch (error) {
        toast.error('Não foi possível cadastrar a matrícula.');
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Form initialData={initialData} schema={schema} onSubmit={handleSubmit}>
      <Container>
        <Title>
          <h2>{id ? 'Editar matrícula' : 'Cadastrar matrícula'}</h2>
          <div>
            <Link to="/registrations">
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
          <SelectInput
            name="student_id"
            isDisabled={loading}
            options={students}
            label="ALUNO"
            placeholder="Buscar aluno"
            noOptionsMessage={() => 'Não há alunos'}
            loadOptions={loadStudents}
            cacheOptions
          />
          <SelectInput
            name="plan_id"
            isDisabled={loading}
            options={plans}
            onChange={setSelectedPlan}
            label="PLANO"
            placeholder="Selecione o plano"
            noOptionsMessage={() => 'Não há planos.'}
            loadOptions={loadPlans}
            cacheOptions
          />
          <DatePickerInput
            name="start_date"
            disabled={loading}
            label="DATA DE INÍCIO"
            onChange={setSelectedStartDate}
            placeholder="Escolha a data"
          />
          <DatePickerInput
            name="end_date"
            label="DATA DE TÉRMINO"
            value={endDate}
            disabled
          />
          <CurrencyInput
            name="totalPrice"
            label="VALOR FINAL"
            value={totalPrice}
            disabled
          />
        </Content>
      </Container>
    </Form>
  );
}

RegistrationsForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

RegistrationsForm.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
