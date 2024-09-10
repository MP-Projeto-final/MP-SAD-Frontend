import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import axios from 'axios';

export default function DonationFormPage() {
  const [descricao, setDescricao] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [qrCode, setQrCode] = useState(null); 
  const [formVisible, setFormVisible] = useState(true); 

  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token) {
      alert('Usuário não autenticado.');
      return;
    }

    const donationData = {
      descricao,
      destino_cep: cep,
      destino_rua: rua,
      destino_numero: numero,
      destino_complemento: complemento,
      destino_bairro: bairro,
      destino_cidade: cidade,
      destino_estado: estado,
    };

    try {
      const response = await axios.post(
        'http://localhost:4000/donations', 
        donationData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      setQrCode(response.data.qrCode); 
      setFormVisible(false); 
    } catch (error) {
      console.error('Erro ao cadastrar doação:', error);
      alert('Erro ao cadastrar a doação.');
    }
  };

  return (
    <PageContainer>
      <Header />
      <Content>
        <Title>Cadastrar doação</Title>

        {formVisible ? (
          <Form onSubmit={handleDonationSubmit}>
            <Label htmlFor="content">Descreva o conteúdo:</Label>
            <Input
              id="content"
              placeholder="Ex.: Pacote de arroz"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <Label htmlFor="cep">Endereço de destino:</Label>
            <Input
              id="cep"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
            <Input
              placeholder="Rua ou quadra"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
            <Input
              placeholder="Número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
            <Input
              placeholder="Complemento"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
            <Input
              placeholder="Bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
            <Input
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            <Input
              placeholder="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
            <SubmitButton type="submit">Cadastrar</SubmitButton>
          </Form>
        ) : (
          <QrCodeContainer>
          <Title>Doação cadastrada com sucesso!</Title>
          <p>Escaneie o QR code para acompanhar a entrega da sua doação:</p>
          {qrCode && <QrCodeImage src={qrCode} alt="QR Code da Doação" />}
        </QrCodeContainer>
        )}
      </Content>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Content = styled.main`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #ffa500;
    box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.2);
  }
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #444;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(51, 51, 51, 0.2);
  }
`;

const QrCodeContainer = styled.div`
  text-align: center;
`;

const QrCodeImage = styled.img`
  margin-top: 1.5rem;
  width: 300px;
  height: 300px;
`;
