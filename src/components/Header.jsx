import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/sign-in'); 
  };

  return (
    <HeaderContainer>
      <Logo>SAD</Logo>
      <Nav>
        <NavItem to='/stats'>Estatísticas</NavItem>
        <NavItem to='/donate'>Doar</NavItem>
        <NavItem to='/upload'>Ler QRcode</NavItem>
        <NavItem to='/update'>Transportadora</NavItem>
      </Nav>
      <IconContainer>
        <UserContainer>
          {user ? (
            <>
              <IconButton onClick={toggleDropdown}>
                <User size={20} />
              </IconButton>
              {dropdownVisible && (
                <DropdownMenu>
                  <DropdownItem to="/mydonations">Minhas Doações</DropdownItem>
                  <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
                </DropdownMenu>
              )}
            </>
          ) : (
            <LoginButton onClick={() => navigate('/sign-in')}>Entrar</LoginButton>
          )}
        </UserContainer>
      </IconContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
`;

const Logo = styled.h1`
  color: #ffa500;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavItem = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;

  &:hover {
    color: #ffa500;
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #ffa500;
  }
`;

const LoginButton = styled.button`
  background-color: #ffa500;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #ff8800;
  }
`;
const UserContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 150px;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    background-color: #ffa500;
    color: #fff;
  }
`;
