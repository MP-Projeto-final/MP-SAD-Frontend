import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Upload } from 'lucide-react';
import jsQR from 'jsqr';
import axios from 'axios';
import Header from '../components/Header';

export default function QRCodeUpload() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState(null); // Armazenar imagem do QR Code
  const [uploadedImage, setUploadedImage] = useState(null); // Armazenar imagem que será enviada
  const [qrCodeRead, setQrCodeRead] = useState(false);
  const [packageId, setPackageId] = useState(null); 
  const qrCodeInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Função para ler o QR Code
  const readQRCode = async () => {
    if (!qrCodeImage) {
      alert('Por favor, faça o upload de uma imagem de QR code.');
      return;
    }

    const image = new Image();
    image.src = previewUrl; // Usando o URL de visualização gerado para o QR Code

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, image.width, image.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        console.log('QR Code data:', code.data);
        const packageIdMatch = code.data.match(/Pacote ID: (\d+)/); 
        if (packageIdMatch) {
          const pacoteId = packageIdMatch[1];
          setPackageId(pacoteId); 
          setQrCodeRead(true); 
        } else {
          alert('QR Code inválido ou não contém um ID de pacote.');
        }
      } else {
        alert('Nenhum QR Code encontrado na imagem.');
      }
    };
  };

  // Função para lidar com o upload da imagem do QR Code
  const handleQRCodeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setQrCodeImage(file); // Armazena a imagem do QR Code
      setPreviewUrl(URL.createObjectURL(file)); // Gera a URL para visualização
    }
  };

  // Função para lidar com o upload da imagem que será enviada
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file); // Armazena a imagem que será enviada
    }
  };

  // Função para enviar o status e a imagem
  const handleSend = async () => {
    if (!packageId || !status || !uploadedImage) {
      alert('Por favor, preencha todos os campos e faça o upload da imagem.');
      return;
    }

    const formData = new FormData();
    formData.append('status', status); 
    formData.append('imagem', uploadedImage);  // Usa a imagem enviada pelo usuário

    try {
      await axios.put(`http://localhost:4000/pacotes/${packageId}/status`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Status e imagem enviados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar dados.');
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Title>Faça upload do QR Code para obter o Pacote ID</Title>
        <UploadContainer onClick={() => qrCodeInputRef.current.click()}>
          <UploadInput
            type="file"
            accept="image/*"
            onChange={handleQRCodeUpload}
            ref={qrCodeInputRef}
            id="qr-code-upload"
          />
          <UploadLabel htmlFor="qr-code-upload">
            <Upload size={48} color="#007bff" />
            <UploadText>Carregar QR Code</UploadText>
          </UploadLabel>
        </UploadContainer>

        {previewUrl && (
          <PreviewContainer>
            <PreviewImage src={previewUrl} alt="QR Code carregado" />
            <Button onClick={readQRCode}>Ler QR Code</Button>
          </PreviewContainer>
        )}

        {qrCodeRead && (
          <>
            <StatusSelect value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Selecione o status</option>
              <option value="em_transito">Em Trânsito</option>
              <option value="entregue">Entregue</option>
              <option value="falha_entrega">Falha na Entrega</option>
            </StatusSelect>

            <Title>Carregar a Imagem que será enviada</Title>
            <UploadContainer onClick={() => imageInputRef.current.click()}>
              <UploadInput
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageInputRef}
                id="image-upload"
              />
              <UploadLabel htmlFor="image-upload">
                <Upload size={48} color="#007bff" />
                <UploadText>Carregar Imagem</UploadText>
              </UploadLabel>
            </UploadContainer>

            {uploadedImage && <p>Imagem pronta para ser enviada.</p>}

            <Button onClick={handleSend}>Enviar</Button>
          </>
        )}
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border: 2px dashed #ccc;
  border-radius: 8px;
  width: 300px;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #007bff;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const UploadText = styled.span`
  margin-top: 1rem;
  color: #666;
`;

const PreviewContainer = styled.div`
  margin-top: 2rem;
  max-width: 300px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const StatusSelect = styled.select`
  margin-top: 1.5rem;
  padding: 0.75rem;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;
