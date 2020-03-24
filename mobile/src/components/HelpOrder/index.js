import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Title, Info, Status, Time, Question } from './styles';

export default function HelpOrder({ data }) {
  const dateFormatted = useMemo(() => {
    return formatRelative(
      parseISO(data.answer_at ? data.answer_at : data.createdAt),
      new Date(),
      {
        locale: pt,
        addSuffix: true,
      }
    );
  }, [data.answer_at, data.createdAt]);

  const status = useMemo(
    () => (data.answer_at ? 'Respondido' : 'Sem resposta'),
    [data.answer_at]
  );

  const answered = useMemo(() => data.answer_at, [data.answer_at]);

  return (
    <Container>
      <Title>
        <Info>
          {answered ? (
            <Icon name="check-circle" size={18} color="#42CB59" />
          ) : (
            <Icon name="hourglass-empty" size={18} color="#999" />
          )}
          <Status answered={answered}>{status}</Status>
        </Info>
        <Time>{dateFormatted}</Time>
      </Title>
      <Question>{data.question}</Question>
    </Container>
  );
}

HelpOrder.propTypes = {
  data: PropTypes.shape({
    createdAt: PropTypes.string,
    answer_at: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};
