import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Info, Title, Time } from './styles';

export default function Checkin({ data }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Info>
        <Title>{data.title}</Title>
        <Time>{dateParsed}</Time>
      </Info>
    </Container>
  );
}

Checkin.propTypes = {
  data: PropTypes.shape({
    createdAt: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
