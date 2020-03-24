import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, List, Loading, CheckInButton } from './styles';

import Header from '~/components/Header';
import Checkin from '~/components/Checkin';
import Background from '~/components/Background';

import api from '~/services/api';

function Dashboard() {
  const student = useSelector(state => state.auth.student);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`/students/${student.id}/checkins`, {
        params: { page },
      });

      const rowCount = response.data.count;

      const newData = response.data.rows.map((checkin, index) => ({
        ...checkin,
        title: `Check-in #${rowCount - ((page - 1) * 10 + index)}`,
      }));
      setCheckins(old => (page >= 2 ? [...old, ...newData] : newData));
    }

    try {
      setRefreshing(true);
      setLoading(true);
      loadCheckins();
    } catch (error) {
      Alert.alert('Falha', 'Não foi possível carregar a lista de check-ins.');
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [page, student.id]);

  function loadMoreCheckins() {
    setPage(page + 1);
  }

  function refreshCheckins() {
    if (page !== 1) {
      setPage(1);
    }
  }

  async function handleNewCheckin() {
    try {
      await api.post(`/students/${student.id}/checkins`, {});

      refreshCheckins();
    } catch (error) {
      Alert.alert(
        'Falha',
        `Não foi possível incluir o check-in: ${error.response.data.error}`
      );
    }
  }

  return (
    <Background>
      <Container>
        <Header />
        <CheckInButton loading={loading} onPress={handleNewCheckin}>
          Novo check-in
        </CheckInButton>
        {loading ? (
          <Loading />
        ) : (
          <List
            data={checkins}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={0.2}
            onEndReached={loadMoreCheckins}
            refreshing={refreshing}
            renderItem={({ item }) => <Checkin data={item} />}
          />
        )}
      </Container>
    </Background>
  );
}

const TabBarIcon = ({ tintColor }) => (
  <Icon name="event" size={20} color={tintColor} />
);

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-in',
  tabBarIcon: TabBarIcon,
};

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default Dashboard;
