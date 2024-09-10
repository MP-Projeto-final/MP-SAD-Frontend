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
        
        setDonations(response.data);
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
              <IconWrapper bgColor={getBgColorByStatus(donation.status)}>
                <Icon>{getIconByStatus(donation.status)}</Icon>
              </IconWrapper>
              <DonationInfo>
                <DonationTitle>{donation.descricao}</DonationTitle>
                <DonationStatus>{donation.status}</DonationStatus>
              </DonationInfo>
            </DonationItem>
          ))}
        </DonationList>
      </Content>
    </PageContainer>
  );
};

const getIconByStatus = (status) => {
  switch (status) {
    case 'entregue':
      return '📦';
    case 'em_transito':
      return '🚚';
    case 'a_ser_buscado':
      return '🏠';
    default:
      return '❓';
  }
};

const getBgColorByStatus = (status) => {
  switch (status) {
    case 'entregue':
      return '#e8f5e9';
    case 'em_transito':
      return '#fff3e0';
    case 'a_ser_buscado':
      return '#e3f2fd';
    default:
      return '#f5f5f5';
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
