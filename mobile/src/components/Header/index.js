import React from 'react';
import logoHeader from '~/assets/logo-header.png';

import { Container, Image } from './styles';

export default function Header() {
  return (
    <Container>
      <Image source={logoHeader} height={50} width={100} />
    </Container>
  );
}
