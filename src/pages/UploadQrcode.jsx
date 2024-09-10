import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import jsQR from 'jsqr';
import Header from '../components/Header';

export default function QRCodeUpload() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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
          navigate(`/donation/${donationId}`); 
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
      </PageContainer>
    </>
  );
}


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