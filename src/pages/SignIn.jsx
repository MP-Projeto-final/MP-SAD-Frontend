import styled from 'styled-components';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../constants/context.js';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL; 

  const handleSignIn = async (e) => {
    e.preventDefault();
    const login = { email, password };
    axios.post(url+'/login', login)
      .then((res) => {
        const newUser = {
            token: res.data.token,
            username: res.data.username
        };
        console.log('Login realizado com sucesso:', res.data);
        const newIdUser = {
            idUser: res.data.userId,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("idUser", JSON.stringify(newIdUser));
        alert('Login realizado com sucesso!');
        navigate("/");
    })
     .catch ((error) => {
      console.error('Erro ao realizar login:', error);
      alert('Erro ao realizar login. Verifique suas credenciais.');
    });
  };

  return (
    <Container>
      <LeftSection>
        <Heart />
      </LeftSection>
      <RightSection>
        <Logo>SAD</Logo>
        <Subtitle>Sistema de Acompanhamento de Doações</Subtitle>
        <Form onSubmit={handleSignIn}>
          <Input 
            type="email" 
            placeholder="Email" 
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
          <Button type="submit">Entrar</Button>
        </Form>
        <ForgotPassword to="/">Não tem conta? Cadastre-se aqui!</ForgotPassword>
        <ForgotPassword href="#">Esqueci minha senha</ForgotPassword>
      </RightSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const LeftSection = styled.div`
  flex: 1;
  background-color: #00b8e6;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Heart = styled.div`
  width: 200px;
  height: 200px;
  background-color: #ff6b6b;
  transform: rotate(-45deg);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;

  &:before,
  &:after {
    content: "";
    width: 200px;
    height: 200px;
    background-color: #ff6b6b;
    border-radius: 50%;
    position: absolute;
  }

  &:before {
    top: -100px;
    left: 0;
  }

  &:after {
    top: 0;
    left: 100px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Logo = styled.h1`
  font-size: 4rem;
  color: #ffa500;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #ffa500;
  text-align: center;
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
  background-color: #333;
  width: 100%;
  padding: 0.8rem;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #00b8e6;
  }
`;

const ForgotPassword = styled(Link)`
  color: #4a90e2;
  text-decoration: none;
  font-size: 0.8rem;
  margin-top: 1rem;
  display: block;
  text-align: center;
`;
