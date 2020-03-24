import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  updateProfileSuccess,
  updateProfileFailure,
} from '~/store/modules/user/actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;
    // console.log(...rest);

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso.');

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    if (error.response.status === 400) {
      toast.error('Erro ao atualizar perfil. Confira seus dados.');
    }

    if (error.response.status === 401) {
      toast.error('Usuário não tem nível de administrador.');
    }
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
