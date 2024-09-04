import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header.jsx';

const MyDonations = () => {
  const donations = [
    { title: 'Cesta básica', status: 'entregue', icon: '📦', bgColor: '#e8f5e9' },
    { title: 'Kit cobertor', status: 'A caminho', icon: '🚚', bgColor: '#fff3e0' },
    { title: 'Peças de roupas', status: 'A ser buscado', icon: '🏠', bgColor: '#e3f2fd' },
    { title: 'Cesta básica', status: 'A ser buscado', icon: '🏠', bgColor: '#e3f2fd' },
    { title: 'Minion de pelúcia', status: 'A caminho', icon: '🚚', bgColor: '#fff3e0' },
  ];

  return (
    <PageContainer>
      <Header />
      <Content>
        <Title>Minhas doações</Title>
        <DonationList>
          {donations.map((donation, index) => (
            <DonationItem key={index}>
              <IconWrapper bgColor={donation.bgColor}>
                <Icon>{donation.icon}</Icon>
              </IconWrapper>
              <DonationInfo>
                <DonationTitle>{donation.title}</DonationTitle>
                <DonationStatus>{donation.status}</DonationStatus>
              </DonationInfo>
            </DonationItem>
          ))}
        </DonationList>
      </Content>
    </PageContainer>
  );
};

export default MyDonations;



const PageContainer = styled.div`
`;

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
  background-color: ${props => props.bgColor};
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
