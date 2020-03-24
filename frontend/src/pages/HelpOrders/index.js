import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { Form } from '@rocketseat/unform';
import Shimmer from 'react-shimmer-effect';

import { Table } from './styles';

import Title from '~/components/Title';
import Button from '~/components/Button';
import Content from '~/components/Content';
import Container from '~/components/Container';
import TextInput from '~/components/TextInput';
import LoadingLine from '~/components/LoadingLine';
import EmptyWrapper from '~/components/EmptyWrapper';
import ConfirmAlert from '~/components/ConfirmAlert';

import api from '~/services/api';

export default function HelpOrdersList() {
  const [loading, setLoading] = useState(false);
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    document.title = 'Gympoint - Pedidos de auxílio';

    async function loadHelpOrders() {
      try {
        setLoading(true);

        const response = await api.get('/help-orders');

        setHelpOrders(response.data);
      } catch (error) {
        toast.error('Não foi possível carregar os pedidos de auxílio.');
      } finally {
        setLoading(false);
      }
    }

    loadHelpOrders();
  }, []);

  function handleAnswerHelpOrder(helpOrder) {
    async function answerHelpOrder(data, onCloseCallback) {
      try {
        await api.put(`/help-orders/${helpOrder.id}/answer`, {
          answer: data.answer,
        });

        toast.success('Pedido de ajuda respondido com suscesso.');

        setHelpOrders(helpOrders.filter(item => item.id !== helpOrder.id));

        onCloseCallback();
      } catch (error) {
        toast.error('Não foi possível responder à este pedido de ajuda.');
      }
    }

    confirmAlert({
      customUI: (
        { onClose } // eslint-disable-line
      ) => (
        <ConfirmAlert
          className="modal-helporders"
          onClose={onClose}
          showButtons={false}
          onlyConfirmButton
          title={`PERGUNTA DE ${helpOrder.student.name.toUpperCase()}`}
          message={
            <>
              <p>{helpOrder.question}</p>

              <Form onSubmit={data => answerHelpOrder(data, onClose)}>
                <TextInput
                  multiline
                  name="answer"
                  id="answer"
                  label="SUA RESPOSTA"
                  placeholder="Escreva sua resposta aqui"
                />

                <Button type="submit" text="Responder aluno" />
              </Form>
            </>
          }
        />
      ),
    });
  }

  return (
    <Container>
      <Title>
        <h2>Pedidos de auxílio</h2>
      </Title>
      <Content>
        <Table>
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
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
                </tr>
              ) : (
                helpOrders.map(helpOrder => (
                  <tr key={helpOrder.id}>
                    <td>{helpOrder.student && helpOrder.student.name}</td>
                    <td>
                      <div className="actions">
                        <button
                          type="button"
                          onClick={() => handleAnswerHelpOrder(helpOrder)}
                        >
                          responder
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}

              {!helpOrders.length && !loading && (
                <tr>
                  <td colSpan="2">
                    <EmptyWrapper>
                      <strong>
                        Não há pedidos de ajuda para serem exibidos.
                      </strong>
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
