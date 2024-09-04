import styled from 'styled-components'
import Header from '../components/Header'

export default function StatisticsPage() {
  return (
    <PageContainer>
      <Header />
      <Content>
        <Card>
          <CardTitle>Total de doações feitas</CardTitle>
          <CardValue>9999</CardValue>
        </Card>
        <Card>
          <CardTitle>Total de doações recebidas</CardTitle>
          <CardValue>9999</CardValue>
        </Card>
        <Card>
          <CardTitle>De onde estão doando</CardTitle>
          <CardList>
            <CardListItem>Brasília - DF</CardListItem>
            <CardListItem>Arinos - MG</CardListItem>
            <CardListItem>Novo Gama - GO</CardListItem>
            <CardListItem>Blumenau - SC</CardListItem>
          </CardList>
        </Card>
        <Card>
          <CardTitle>Onde estão recebendo</CardTitle>
          <CardList>
            <CardListItem>São Paulo - SP</CardListItem>
            <CardListItem>Salvador - BA</CardListItem>
            <CardListItem>Manaus - AM</CardListItem>
            <CardListItem>Jataí - GO</CardListItem>
          </CardList>
        </Card>
        <Card>
          <CardTitle>O que estão doando</CardTitle>
          <CardList>
            <CardListItem>Cesta básica</CardListItem>
            <CardListItem>Kit cobertor</CardListItem>
            <CardListItem>Peças de roupas</CardListItem>
            <CardListItem>Minion de Pelúcia</CardListItem>
          </CardList>
        </Card>
        <Card>
          <CardTitle>O que estão recebendo</CardTitle>
          <CardList>
            <CardListItem>Pacote de arroz</CardListItem>
            <CardListItem>Edredom</CardListItem>
            <CardListItem>Blusa</CardListItem>
            <CardListItem>Chinelo</CardListItem>
          </CardList>
        </Card>
      </Content>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`

const Content = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const Card = styled.div`
  background-color: #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const CardValue = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffa500;
  margin-bottom: 1rem;
`

const CardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const CardListItem = styled.li`
  color: #ffa500;
  margin-bottom: 0.5rem;
`