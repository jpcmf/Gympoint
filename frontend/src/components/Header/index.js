import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo2-gympoint@2x.png';

import { Container, Content, ItemMenu, Profile } from './styles';

import colors from '~/styles/colors';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const ActiveStyle = {
    color: `${colors.dark}`,
  };

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="Gympoint" />
          </Link>
          <ItemMenu activeStyle={ActiveStyle} to="/students">
            ALUNOS
          </ItemMenu>
          <ItemMenu activeStyle={ActiveStyle} to="/plans">
            PLANOS
          </ItemMenu>
          <ItemMenu activeStyle={ActiveStyle} to="/registrations">
            MATRÍCULAS
          </ItemMenu>
          <ItemMenu activeStyle={ActiveStyle} to="/help-orders">
            PEDIDOS DE AUXÍLIO
          </ItemMenu>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/" onClick={handleSignOut}>
                sair do sistema
              </Link>
            </div>
            <Link to="/profile">
              <img
                src={
                  profile.avatar
                    ? profile.avatar.url
                    : 'https://api.adorable.io/avatars/40/abott@adorable.png'
                }
                alt={profile.name}
              />
            </Link>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
