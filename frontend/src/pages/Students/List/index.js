import React, { useState, useEffect } from 'react';
import Shimmer from 'react-shimmer-effect';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MdAdd, MdSearch } from 'react-icons/md';

import { Table } from './styles';

import Title from '~/components/Title';
import Button from '~/components/Button';
import Content from '~/components/Content';
import TextInput from '~/components/TextInput';
import Container from '~/components/Container';
import LoadingLine from '~/components/LoadingLine';
import EmptyWrapper from '~/components/EmptyWrapper';
import ConfirmAlert from '~/components/ConfirmAlert';

import api from '~/services/api';

export default function StudentsList() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    document.title = 'Gympoint - Alunos';
  }, []);

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoading(true);

        const response = await api.get('students', {
          params: { q: search },
        });

        setStudents(response.data);
      } catch (error) {
        toast.error('Não foi possível carregar os alunos.');
      }

      setLoading(false);
    }
    loadStudents();
  }, [search]);

  function handleSearchSubmit(data) {
    setSearch(data.search);
  }

  async function handleDeleteStudent(student) {
    function deleteStudent() {
      try {
        api.delete(`/students/${student.id}`);
        toast.success('Aluno deletado com sucesso.');

        setStudents(
          students.filter(currentStudent => currentStudent.id !== student.id)
        );
      } catch (err) {
        toast.error('Não foi possível excluir o aluno.');
      }
    }

    confirmAlert({
      customUI: ({ onClose }) => ( // eslint-disable-line
        <ConfirmAlert
          callback={deleteStudent}
          onClose={onClose}
          title="Tem certeza que deseja excluir o aluno?"
          message={
            <p>
              Ao confirmar que o aluno <strong>{student.name}</strong> será
              excluído não será possível reverter. Tem certeza que deseja
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
        <h2>Gerenciando alunos</h2>
        <div>
          <Link to="/students/create">
            <Button icon={MdAdd} type="button" text="CADASTRAR" />
          </Link>
          <Form onSubmit={handleSearchSubmit}>
            <MdSearch />
            <TextInput
              className="search_input"
              type="text"
              name="search"
              placeholder="Buscar por aluno"
            />
          </Form>
        </div>
      </Title>
      <Content>
        <Table>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th>IDADE</th>
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
                </tr>
              ) : (
                students.map(student => (
                  <tr key={student.id}>
                    <td>
                      <div className="avatar">
                        <img
                          src={
                            student.avatar
                              ? student.avatar.url
                              : 'https://api.adorable.io/avatars/40/abott@adorable.png'
                          }
                          alt={student.name}
                        />
                        {student.name}
                      </div>
                    </td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>
                      <div className="actions">
                        <Link to={`/students/${student.id}`}>editar</Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteStudent(student)}
                        >
                          excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {!students.length && !loading && (
                <tr>
                  <td colSpan="3">
                    <EmptyWrapper>
                      <strong>Não há alunos cadastrados.</strong>
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
