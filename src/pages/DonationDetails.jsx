import React from 'react'
import styled from 'styled-components'
import { Box, Clock, Home } from 'lucide-react'

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`

const DonationCard = styled.div`
  background-color: #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`

const DonationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const IconWrapper = styled.div`
  background-color: #c8e6c9;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`

const DonationInfo = styled.div`
  flex-grow: 1;
`

const DonationTitle = styled.h2`
  margin: 0;
  font-size: 1.2em;
`

const DonationStatus = styled.p`
  margin: 0;
  color: #4caf50;
`

const DetailsRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const DetailText = styled.p`
  margin: 0;
  margin-left: 10px;
`

const DescriptionInput = styled.textarea`
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`

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
`

export default function Component() {
  return (
    <PageContainer>
      <Title>Minhas doações</Title>
      <DonationCard>
        <DonationHeader>
          <IconWrapper>
            <Box size={24} />
          </IconWrapper>
          <DonationInfo>
            <DonationTitle>Cesta básica</DonationTitle>
            <DonationStatus>entregue</DonationStatus>
          </DonationInfo>
        </DonationHeader>
        <DetailsRow>
          <Clock size={18} />
          <DetailText>
            Saída: 08:30 - 23/08/2023
            <br />
            Chegada: 16:14 - 23/08/2023
          </DetailText>
        </DetailsRow>
        <DetailsRow>
          <Home size={18} />
          <DetailText>
            Brasília - DF
            <br />
            UNB, Casa do estudante, apt 606
          </DetailText>
        </DetailsRow>
        <DescriptionInput placeholder="Descrição do conteúdo" />
        <ImageGrid>
          <ImagePlaceholder>Imagem</ImagePlaceholder>
          <ImagePlaceholder>Imagem</ImagePlaceholder>
          <ImagePlaceholder>Imagem</ImagePlaceholder>
          <ImagePlaceholder>+1</ImagePlaceholder>
        </ImageGrid>
      </DonationCard>
    </PageContainer>
  )
}