import styled from 'styled-components'
import { Bell, User } from 'lucide-react'

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>SAD</Logo>
      <Nav>
        <NavItem href="#">Estatísticas</NavItem>
        <NavItem href="#">Doar</NavItem>
        <NavItem href="#">Minhas doações</NavItem>
      </Nav>
      <IconContainer>
        <IconButton>
          <Bell size={20} />
        </IconButton>
        <IconButton>
          <User size={20} />
        </IconButton>
      </IconContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
`

const Logo = styled.h1`
  color: #ffa500;
  font-size: 1.5rem;
  font-weight: bold;
`

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`

const NavItem = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #ffa500;
  }
`

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #ffa500;
  }
`