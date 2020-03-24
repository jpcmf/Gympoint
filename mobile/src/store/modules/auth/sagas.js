import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    if (!id || id.lenght === 0) {
      Alert.alert('Falha', 'Informe o ID do estudante.');
      yield put(signFailure());
    } else {
      const response = yield call(api.post, '/sessions/student', {
        id,
      });

      const { token, student } = response.data;

      api.defaults.headers.Authorization = `Bearer ${token}`;

      yield put(signInSuccess(token, student));
    }
  } catch (error) {
    Alert.alert('Falha na autenticação.', 'Usuário e senha não conferem.');

    yield put(signFailure());
  }
}

// export function* signUp({ payload }) {
//   try {
//     const { name, email, password } = payload;
//     yield call(api.post, 'users', {
//       name,
//       email,
//       password,
//     });
//     Alert.alert('Parabéns!', 'Conta criada com sucesso.');
//     // history.push('/');
//   } catch (error) {
//     Alert.alert('Falha no cadastro.', 'Verifique seus dados.');
//     yield put(signFailure());
//   }
// }

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

// export function signOut() {
//   history.push('/');
// }

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  // takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  // takeLatest('@auth/SIGN_OUT', signOut),
]);
