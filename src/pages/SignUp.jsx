import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
      name,
      phone,
    };

    try {
      const response = await axios.post(url+'/sign-up', userData);
      alert('Cadastro realizado com sucesso!');
      console.log('Cadastro realizado:', response.data);
      navigate('/sign-in');
    } catch (error) {
      alert('Erro ao realizar o cadastro.');
      console.error('Erro:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <PageContainer>
      <ImageSection>
        <Logo>
          <Heart />
          <Arrow />
        </Logo>
      </ImageSection>
      <FormSection>
        <Title>Criar conta</Title>
        <Subtitle to="/sign-in">ou entrar com conta existente</Subtitle>
        <Form onSubmit={handleSignup}>
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </FormSection>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f0f0;
`;

const ImageSection = styled.div`
  flex: 1;
  background-color: #2a9d8f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Logo = styled.div`
  width: 200px;
  height: 200px;
  background-color: #2a9d8f;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heart = styled.div`
  width: 60px;
  height: 60px;
  background-color: white;
  transform: rotate(45deg);
  position: relative;

  &::before,
  &::after {
    content: "";
    width: 60px;
    height: 60px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
  }

  &::before {
    left: -30px;
  }

  &::after {
    top: -30px;
  }
`;

const Arrow = styled.div`

  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 30px solid white;
  position: absolute;
`;


const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled(Link)`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  width: 100%;
  max-width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #2a9d8f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #238b7e;
  }
`;

const ForgotPassword = styled.a`
  font-size: 0.9rem;
  color: #2a9d8f;
  text-decoration: none;
  margin-top: 1rem;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;
