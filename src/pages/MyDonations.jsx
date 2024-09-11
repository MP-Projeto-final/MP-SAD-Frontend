import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/Header';

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      if (!token) {
        alert('Usuário não autenticado. Redirecionando para login.');
        navigate('/login'); 
        return;
      }
      try {
        const response = await axios.get('http://localhost:4000/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setDonations(response.data); // Agora inclui o status do pacote
      } catch (err) {
        setError('Erro ao buscar doações');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <PageContainer>
      <Header />
      <Content>
        <Title>Minhas doações</Title>
        <DonationList>
          {donations.map((donation, index) => (
            <DonationItem key={index}>
              <IconWrapper bgColor={getBgColorByStatus(donation.pacote_status)}>
                <Icon>{getIconByStatus(donation.pacote_status)}</Icon>
              </IconWrapper>
              <DonationInfo>
                <DonationTitle>{donation.descricao}</DonationTitle>
                <DonationStatus>{formatStatus(donation.pacote_status)}</DonationStatus>
              </DonationInfo>
            </DonationItem>
          ))}
        </DonationList>
      </Content>
    </PageContainer>
  );
};

const getIconByStatus = (status) => {
  switch (status.toLowerCase()) {
    case 'criado':
      return '📦';  // Pacote criado
    case 'em_transito':
      return '🚚';  // Pacote em trânsito
    case 'entregue':
      return '🏠';  // Pacote entregue
    default:
      return '❓';  // Status desconhecido
  }
};

const getBgColorByStatus = (status) => {
  switch (status.toLowerCase()) {
    case 'criado':
      return '#e8f5e9';  // Verde claro
    case 'em_transito':
      return '#fff3e0';  // Laranja claro
    case 'entregue':
      return '#e3f2fd';  // Azul claro
    default:
      return '#f5f5f5';  // Cinza claro
  }
};

const formatStatus = (status) => {
  switch (status.toLowerCase()) {
    case 'criado':
      return 'Criado';
    case 'em_transito':
      return 'Em Trânsito';
    case 'entregue':
      return 'Entregue';
    default:
      return 'Desconhecido';
  }
};

export default MyDonations;

const PageContainer = styled.div``;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
`;

const DonationList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const DonationItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  background-color: ${(props) => props.bgColor};
`;

const Icon = styled.span`
  font-size: 50px;
`;

const DonationInfo = styled.div``;

const DonationTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const DonationStatus = styled.p`
  margin: 0;
  color: #666;
  font-size: 1rem;
`;

