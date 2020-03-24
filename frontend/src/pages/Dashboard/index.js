import React, { useState, useEffect } from 'react';
import { FiUsers, FiLifeBuoy, FiLayers, FiTarget } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Shimmer from 'react-shimmer-effect';

import {
  Content,
  Card,
  LoadingContainer,
  LoadingCircle,
  LoadingLine,
} from './styles';

import Container from '~/components/Container';
import Title from '~/components/Title';

import api from '~/services/api';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    students: 0,
    plans: 0,
    registrations: 0,
    helpOrders: 0,
  });
  const [cards] = useState([
    {
      name: 'Students',
      alias: 'Alunos',
      description: 'Alunos ativos',
      icon: FiUsers,
      value: 'students',
      to: '/students',
    },
    {
      name: 'Plans',
      alias: 'Planos',
      description: 'Planos ativos',
      icon: FiLayers,
      value: 'plans',
      to: '/plans',
    },
    {
      name: 'Registrations',
      alias: 'Matrículas',
      description: 'Matrículas ativas',
      icon: FiTarget,
      value: 'registrations',
      to: '/registrations',
    },
    {
      name: 'HelpOrders',
      alias: 'Pedidos de auxílio',
      description: 'Pedidos pendentes',
      icon: FiLifeBuoy,
      value: 'helpOrders',
      to: '/help-orders',
    },
  ]);

  useEffect(() => {
    document.title = 'Gympoint - Dashboard';
  }, []);

  useEffect(() => {
    async function loadValues() {
      try {
        setLoading(true);

        const response = await api.get('/dashboard');

        const { students, plans, registrations, helpOrders } = response.data;

        setValues({ students, plans, registrations, helpOrders });
      } catch (error) {
        toast.error('Não foi possível carregar as informações do dashboard.');
      }
      setLoading(false);
    }
    loadValues();
  }, []);
  return (
    <Container>
      <Title>
        <h2>Dashboard</h2>
      </Title>
      <Content>
        {cards.map(card =>
          loading ? (
            <LoadingContainer key={card.name}>
              <Shimmer>
                <LoadingCircle />
              </Shimmer>
              <Shimmer>
                <LoadingLine />
              </Shimmer>
            </LoadingContainer>
          ) : (
            <Link key={card.name} to={card.to}>
              <Card>
                <div>
                  {card.icon()}
                  <h1>{card.alias}</h1>
                </div>
                <div className="value">
                  <h1>{values[card.value]}</h1>
                  <span>{card.description}</span>
                </div>
              </Card>
            </Link>
          )
        )}
      </Content>
    </Container>
  );
}
