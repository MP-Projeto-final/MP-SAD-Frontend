import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SignInImg from '../assets/signup.png'

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
        <Logo src={SignInImg} />
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
  background-color: #0EB0E9;
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

const Logo = styled.img`
  width: 100%;
  height: auto;


  display: flex;
  justify-content: center;
  align-items: center;
`;



const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: black;
  font-weight: bold;
`;

const Subtitle = styled(Link)`
  font-size: 1rem;
  color: #4F75FF;
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
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  &:hover {
    background-color: #ffa500;
  }
`;

