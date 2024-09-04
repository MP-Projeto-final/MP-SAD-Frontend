import React from 'react';
import styled from 'styled-components';

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
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 30px solid white;
  position: absolute;
  bottom: -80px;
`;

const Box = styled.div`
  width: 100px;
  height: 60px;
  background-color: #e9c46a;
  position: absolute;
  bottom: -150px;
  transform: perspective(100px) rotateX(30deg);

  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 20px;
    background-color: #f4a261;
    transform: skew(-45deg);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: -20px;
    width: 20px;
    height: 100%;
    background-color: #e76f51;
    transform: skew(0, -45deg);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
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

export default function SignupPage() {
  return (
    <PageContainer>
      <ImageSection>
        <Logo>
          <Heart />
          <Arrow />
          <Box />
        </Logo>
      </ImageSection>
      <FormSection>
        <Title>Criar conta</Title>
        <Subtitle>ou entrar com conta existente</Subtitle>
        <Form>
          <Input type="text" placeholder="Apelido" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Senha" />
          <Button type="submit">Entrar</Button>
        </Form>
        <ForgotPassword href="#">Esqueci minha senha</ForgotPassword>
      </FormSection>
    </PageContainer>
  );
}