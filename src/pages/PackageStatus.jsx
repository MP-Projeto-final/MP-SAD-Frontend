import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Upload } from 'lucide-react';
import jsQR from 'jsqr';
import axios from 'axios';
import Header from '../components/Header';

export default function QRCodeUpload() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState('');
  const [images, setImages] = useState([]);
  const [qrCodeRead, setQrCodeRead] = useState(false); // Flag to check if QR code has been read
  const [packageId, setPackageId] = useState(null); // Stores the package ID
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const readQRCode = async () => {
    if (!previewUrl) {
      alert('Por favor, faça o upload de uma imagem de QR code.');
      return;
    }

    const image = new Image();
    image.src = previewUrl;

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
        const donationIdMatch = code.data.match(/Doacao ID: (\d+)/);
        if (donationIdMatch) {
          const donationId = donationIdMatch[1];
          setPackageId(donationId); // Stores the package ID
          setQrCodeRead(true); // Sets the flag to true after reading the QR code
        } else {
          alert('QR Code inválido ou não contém um ID de doação.');
        }
      } else {
        alert('Nenhum QR Code encontrado na imagem.');
      }
    };
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file)); // Converts file to URL for preview
    setImages([...images, ...newImages]);
  };

  // Function to send status and images
  const handleSend = async () => {
    if (!packageId || !status || images.length === 0) {
      alert('Por favor, preencha todos os campos e faça o upload das imagens.');
      return;
    }

    const formData = new FormData();
    formData.append('status', status);
    images.forEach((image, index) => {
      formData.append(`imagens`, image); // Sends all images
    });

    try {
      await axios.put(`http://localhost:4000/pacotes/${packageId}/status`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Status e imagens enviados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar dados.');
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Title>Upload QR Code Image</Title>
        <UploadContainer onClick={handleUploadClick}>
          <UploadInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            id="qr-code-upload"
          />
          <UploadLabel htmlFor="qr-code-upload">
            <Upload size={48} color="#007bff" />
            <UploadText>Click or drag to upload QR code image</UploadText>
          </UploadLabel>
        </UploadContainer>

        {previewUrl && (
          <PreviewContainer>
            <PreviewImage src={previewUrl} alt="Uploaded QR Code" />
            <Button onClick={readQRCode}>Ler QR Code</Button>
          </PreviewContainer>
        )}

        {qrCodeRead && ( // Show only if QR code is read
          <>
            <StatusSelect value={status} onChange={handleStatusChange}>
              <option value="">Selecione o status</option>
              <option value="em_transito">Em Trânsito</option>
              <option value="entregue">Entregue</option>
              <option value="falha_entrega">Falha na Entrega</option>
            </StatusSelect>

            <ImageUploadContainer>
              {images.map((image, index) => (
                <PreviewImage key={index} src={image} alt={`Uploaded ${index + 1}`} />
              ))}
              <UploadButton onClick={() => imageInputRef.current.click()}>
                <Upload size={24} color="#007bff" />
                <UploadText>Upload Images</UploadText>
              </UploadButton>
              <UploadInput
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                ref={imageInputRef}
              />
            </ImageUploadContainer>

            <Button onClick={handleSend}>Enviar</Button>
          </>
        )}
      </PageContainer>
    </>
  );
}

// Styled components remain the same as before

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: Arial, sans-serif;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
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

const ImageUploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  width: 100%;
  max-width: 300px;
`;

const UploadButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #007bff;
  }
`;
