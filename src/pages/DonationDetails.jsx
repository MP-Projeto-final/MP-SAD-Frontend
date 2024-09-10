import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Clock, Home } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Header from '../components/Header'; 

export default function DonationDetailsPage() {
  const { id } = useParams(); 
  const [donationDetails, setDonationDetails] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchDonationDetails = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      if (!token) {
        alert('Usuário não autenticado. Redirecionando para login.');
        navigate('/login'); 
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonationDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao buscar detalhes da doação');
        setLoading(false);
      }
    };

    fetchDonationDetails();
  }, [id, navigate]); 

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <PageContainer>
      <Header />
      <Title>Detalhes da doação</Title>

      {donationDetails && (
        <DonationCard>
          <DonationHeader>
            <IconWrapper>
              <Box size={24} />
            </IconWrapper>
            <DonationInfo>
              <DonationTitle>{donationDetails.descricao}</DonationTitle>
              <DonationStatus>{donationDetails.status}</DonationStatus>
            </DonationInfo>
          </DonationHeader>

          <DetailsRow>
            <Clock size={18} />
            <DetailText>
              Saída: {donationDetails.data_enviado ? donationDetails.data_enviado : 'Ainda não enviado'}
              <br />
              Chegada: {donationDetails.data_status ? donationDetails.data_status : 'Ainda não entregue'}
            </DetailText>
          </DetailsRow>

          <DetailsRow>
            <Home size={18} />
            <DetailText>
              {donationDetails.destino_cidade} - {donationDetails.destino_estado}
              <br />
              {donationDetails.destino_rua}, {donationDetails.destino_numero}, {donationDetails.destino_bairro}
              <br />
              {donationDetails.destino_complemento}
            </DetailText>
          </DetailsRow>

          <DescriptionInput defaultValue={donationDetails.descricao} readOnly />

          <ImageGrid>
            <ImagePlaceholder>Imagem</ImagePlaceholder>
            <ImagePlaceholder>Imagem</ImagePlaceholder>
            <ImagePlaceholder>Imagem</ImagePlaceholder>
            <ImagePlaceholder>+1</ImagePlaceholder>
          </ImageGrid>
        </DonationCard>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;

  border-radius: 10px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const DonationCard = styled.div`
  background-color: #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const DonationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  background-color: #c8e6c9;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

const DonationInfo = styled.div`
  flex-grow: 1;
`;

const DonationTitle = styled.h2`
  margin: 0;
  font-size: 1.2em;
`;

const DonationStatus = styled.p`
  margin: 0;
  color: #4caf50;
`;

const DetailsRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const DetailText = styled.p`
  margin: 0;
  margin-left: 10px;
`;

const DescriptionInput = styled.textarea`
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const ImagePlaceholder = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
  color: #666;
`;
