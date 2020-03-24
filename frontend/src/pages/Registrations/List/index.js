import React, { useState, useEffect } from 'react';
import pt from 'date-fns/locale/pt';
import Shimmer from 'react-shimmer-effect';
import { toast } from 'react-toastify';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { format, parseISO } from 'date-fns';

import { Table } from './styles';
import colors from '~/styles/colors';

import Title from '~/components/Title';
import Button from '~/components/Button';
import Content from '~/components/Content';
import Container from '~/components/Container';
import LoadingLine from '~/components/LoadingLine';
import EmptyWrapper from '~/components/EmptyWrapper';
import ConfirmAlert from '~/components/ConfirmAlert';

import api from '~/services/api';

export default function RegistrationsList() {
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    document.title = 'Gympoint - Matrículas';

    async function loadRegistrations() {
      try {
        setLoading(true);

        const response = await api.get('registrations', {
          params: {},
        });

        const data = response.data.map(registration => ({
          ...registration,
          start_date_formatted: format(
            parseISO(registration.start_date),
            "dd 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
          end_date_formatted: format(
            parseISO(registration.end_date),
            "dd 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
        }));

        setRegistrations(data);
      } catch (error) {
        toast.error('Não foi possível carregar os planos.');
      }

      setLoading(false);
    }
    loadRegistrations();
  }, []);

  async function handleDeleteRegistration(registration) {
    async function deleteRegistration() {
      try {
        await api.delete(`/registrations/${registration.id}`);

        toast.success('Matrícula excluída com sucesso.');

        setRegistrations(
          registrations.filter(
            currentRegistration => currentRegistration.id !== registration.id
          )
        );
      } catch (error) {
        toast.error('Não foi possível excluir esta matrícula.');
      }
    }

    confirmAlert({
      customUI: ({ onClose }) => ( // eslint-disable-line
        <ConfirmAlert
          callback={deleteRegistration}
          onClose={onClose}
          title="Tem certeza que deseja excluir esta matrícula?"
          message={
            <p>
              Ao confirmar que a matrícula <strong>{registration.id}</strong>{' '}
              será excluída não será possível reverter. Tem certeza que deseja
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
        <h2>Gerenciando matrículas</h2>
        <div>
          <Link to="/registrations/create">
            <Button icon={MdAdd} type="button" text="CADASTRAR" />
          </Link>
        </div>
      </Title>
      <Content>
        <Table>
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th>PLANO</th>
                <th>INÍCIO</th>
                <th>TÉRMINO</th>
                <th>ATIVA</th>
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
                registrations.map(registration => (
                  <tr key={registration.id}>
                    <td>{registration.student.name}</td>
                    <td>{registration.plan.title}</td>
                    <td>{registration.start_date_formatted}</td>
                    <td>{registration.end_date_formatted}</td>
                    <td>
                      {registration.active ? (
                        <MdCheckCircle color={colors.success} size={24} />
                      ) : (
                        <MdCheckCircle color={colors.grey} size={24} />
                      )}
                    </td>
                    <td>
                      <div className="actions">
                        <Link to={`/registrations/${registration.id}`}>
                          editar
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteRegistration(registration)}
                        >
                          excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {!registrations.length && !loading && (
                <tr>
                  <td colSpan="3">
                    <EmptyWrapper>
                      <strong>Não há matrículas cadastradas.</strong>
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
