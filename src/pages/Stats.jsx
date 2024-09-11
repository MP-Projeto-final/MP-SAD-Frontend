import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/Header';

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:4000/stats'); // Sem token
        setStatistics(response.data);
      } catch (err) {
        setError('Erro ao buscar estatísticas');
      }
    };
  
    fetchStatistics();
  }, []);
  


  if (error) return <p>{error}</p>;

  return (
    <PageContainer>
      <Header />
      <Content>
        <Card>
          <CardTitle>Total de doações feitas</CardTitle>
          <CardValue>{statistics.totalDoacoesFeitas}</CardValue>
        </Card>
        <Card>
          <CardTitle>Total de doações recebidas</CardTitle>
          <CardValue>{statistics.totalDoacoesRecebidas}</CardValue>
        </Card>
        <Card>
          <CardTitle>De onde estão doando</CardTitle>
          <CardList>
            {statistics.localidadesDeOrigem?.map((local, index) => ( 
              <CardListItem key={index}>
                {local.origem_cidade ? `${local.origem_cidade} - ${local.origem_estado}` : 'Local desconhecido'}
              </CardListItem>
            ))}
          </CardList>
        </Card>

        <Card>
          <CardTitle>Onde estão recebendo</CardTitle>
          <CardList>
            {statistics.localidadesDeDestino?.map((local, index) => ( 
              <CardListItem key={index}>
                {local.destino_cidade ? `${local.destino_cidade} - ${local.destino_estado}` : 'Local desconhecido'}
              </CardListItem>
            ))}
          </CardList>
        </Card>
        <Card>
          <CardTitle>O que estão doando</CardTitle>
          <CardList>
            {statistics.itensDoacao?.map((item, index) => ( // Verifique se o campo está definido
              <CardListItem key={index}>{item.descricao}</CardListItem>
            ))}
          </CardList>
        </Card>
        <Card>
          <CardTitle>O que estão recebendo</CardTitle>
          <CardList>
            {statistics.itensRecebidos?.map((item, index) => ( // Verifique se o campo está definido
              <CardListItem key={index}>{item.descricao}</CardListItem>
            ))}
          </CardList>
        </Card>
      </Content>
    </PageContainer>
  );
  
}

const PageContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Content = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CardValue = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffa500;
  margin-bottom: 1rem;
`;

const CardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const CardListItem = styled.li`
  color: #ffa500;
  margin-bottom: 0.5rem;
`;
