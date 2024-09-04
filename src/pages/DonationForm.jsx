import styled from 'styled-components'
import Header from '../components/Header'

export default function DonationFormPage() {
  return (
    <PageContainer>
      <Header />
      <Content>
        <Title>Cadastrar doação</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
            <Label htmlFor="content">Descreva o conteúdo:</Label>
            <Input id="content" placeholder="Ex.: Pacote de arroz" />
            <Label htmlFor="cep">Endereço de destino:</Label>
            <Input id="cep" placeholder="CEP" />
            <Input placeholder="Rua ou quadra" />
            <Input placeholder="Número" />
            <Input placeholder="Complemento" />
            <Input placeholder="Bairro" />
            <Input placeholder="Cidade" />
            <Input placeholder="Estado" />
            <SubmitButton type="submit">Cadastrar</SubmitButton>
        </Form>
      </Content>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`

const Content = styled.main`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Label = styled.label`
  font-weight: 500;
`

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
`

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
`