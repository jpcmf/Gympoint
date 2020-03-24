import React, { useEffect, useState } from 'react';
import pt from 'date-fns/locale/pt';
import Shimmer from 'react-shimmer-effect';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { formatDistanceStrict, addMonths } from 'date-fns';

import { Table } from './styles';

import Title from '~/components/Title';
import Button from '~/components/Button';
import Content from '~/components/Content';
import Container from '~/components/Container';
import LoadingLine from '~/components/LoadingLine';
import EmptyWrapper from '~/components/EmptyWrapper';
import ConfirmAlert from '~/components/ConfirmAlert';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

export default function PlansList() {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    document.title = 'Gympoint - Planos';

    async function loadPlans() {
      try {
        setLoading(true);

        const response = await api.get('plans', {
          params: {},
        });

        const data = response.data.map(plan => ({
          ...plan,
          priceFormatted: formatPrice(plan.price),
          durationFormatted: formatDistanceStrict(
            addMonths(new Date(), plan.duration),
            new Date(),
            { locale: pt }
          ),
        }));

        setPlans(data);
      } catch (error) {
        toast.error('Não foi possível carregar os planos.');
      }

      setLoading(false);
    }
    loadPlans();
  }, []);

  async function handleDeletePlan(plan) {
    async function deletePlan() {
      try {
        await api.delete(`/plans/${plan.id}`);

        toast.success('Plano excluído com sucesso.');

        setPlans(plans.filter(currentStudent => currentStudent.id !== plan.id));
      } catch (error) {
        toast.error('Não foi possível excluir este plano.');
      }
    }

    confirmAlert({
      customUI: ({ onClose }) => ( // eslint-disable-line
        <ConfirmAlert
          callback={deletePlan}
          onClose={onClose}
          title="Tem certeza que deseja excluir este plano?"
          message={
            <p>
              Ao confirmar que o plano <strong>{plan.title}</strong> será
              excluído não será possível reverter. Tem certeza que deseja
              excluir?
            </p>
          }
        />
      ),
    });
  }

  return (
    <Container>
      <Title>
        <h2>Gerenciando planos</h2>
        <div>
          <Link to="/plans/create">
            <Button icon={MdAdd} type="button" text="CADASTRAR" />
          </Link>
        </div>
      </Title>
      <Content>
        <Table>
          <table>
            <thead>
              <tr>
                <th>TÍTULO</th>
                <th>DURAÇÃO</th>
                <th>VALOR MENSAL</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td>
                    <Shimmer>
                      <LoadingLine />
                    </Shimmer>
                  </td>
                  <td>
                    <Shimmer>
                      <LoadingLine />
                    </Shimmer>
                  </td>
                  <td>
                    <Shimmer>
                      <LoadingLine />
                    </Shimmer>
                  </td>
                </tr>
              ) : (
                plans.map(plan => (
                  <tr key={plan.id}>
                    <td>{plan.title}</td>
                    <td>{plan.durationFormatted}</td>
                    <td>{plan.priceFormatted}</td>
                    <td>
                      <div className="actions">
                        <Link to={`/plans/${plan.id}`}>editar</Link>
                        <button
                          type="button"
                          onClick={() => handleDeletePlan(plan)}
                        >
                          excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {!plans.length && !loading && (
                <tr>
                  <td colSpan="3">
                    <EmptyWrapper>
                      <strong>Não há planos cadastrados.</strong>
                    </EmptyWrapper>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Table>
      </Content>
    </Container>
  );
}
