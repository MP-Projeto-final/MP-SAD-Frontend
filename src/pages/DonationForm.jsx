import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import axios from 'axios';

const estadosBrasil = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export default function DonationFormPage() {
  const [descricao, setDescricao] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidadeDestino, setCidadeDestino] = useState(''); 
  const [estadoDestino, setEstadoDestino] = useState(''); 
  const [cidadeOrigem, setCidadeOrigem] = useState(''); 
  const [estadoOrigem, setEstadoOrigem] = useState(''); 
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
      destino_cidade: cidadeDestino, 
      destino_estado: estadoDestino, 
      origem_cidade: cidadeOrigem, 
      origem_estado: estadoOrigem 
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

  const handleDownloadQrCode = () => {
    if (!qrCode) {
      alert('QR code não disponível');
      return;
    }
  
    const link = document.createElement('a');
    link.href = qrCode; 
    link.download = 'qrcode.png'; 
    link.click();
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

            <Label htmlFor="estadoOrigem">Estado de Origem:</Label>
            <Select
              id="estadoOrigem"
              value={estadoOrigem}
              onChange={(e) => setEstadoOrigem(e.target.value)}
            >
              <option value="">Selecione o estado</option>
              {estadosBrasil.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </Select>

            <Label htmlFor="cidadeOrigem">Cidade de Origem:</Label>
            <Input
              id="cidadeOrigem"
              placeholder="Cidade de Origem"
              value={cidadeOrigem}
              onChange={(e) => setCidadeOrigem(e.target.value)}
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
            <Label htmlFor="cidadeDestino">Cidade de Destino:</Label>
            <Input
              id="cidadeDestino"
              placeholder="Cidade de Destino"
              value={cidadeDestino}
              onChange={(e) => setCidadeDestino(e.target.value)}
            />
            <Label htmlFor="estadoDestino">Estado de Destino:</Label>
            <Select
              id="estadoDestino"
              value={estadoDestino}
              onChange={(e) => setEstadoDestino(e.target.value)}
            >
              <option value="">Selecione o estado</option>
              {estadosBrasil.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </Select>

            <SubmitButton type="submit">Cadastrar</SubmitButton>
          </Form>
        ) : (
          <QrCodeContainer>
          <Title>Doação cadastrada com sucesso!</Title>
          <p>Baixe o QR code para acompanhar a entrega da sua doação:</p>
          {qrCode && (
            <>
              <QrCodeImage src={qrCode} alt="QR Code da Doação" />
              <DownloadButton onClick={handleDownloadQrCode}>
                Baixar QR Code
              </DownloadButton>
            </>
          )}
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

const Select = styled.select`
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

const DownloadButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background-color: #ffa500;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff8800;
  }

  &:focus {
    outline: none;
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
    background-color: #FAA630;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(51, 51, 51, 0.2);
  }
`;

const QrCodeContainer = styled.div`
  display: flex;  
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const QrCodeImage = styled.img`
  margin-top: 1.5rem;
  width: 300px;
  height: 300px;
`;
