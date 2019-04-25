import React from 'react';
import styled from 'styled-components';
import '../styles/reset.css';
import RecipeProvider from '../context/RecipeProvider';
import Header from '../components/header';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right, #BDFFF3, #4AC29A);
  text-transform: lowercase;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
`;

const Layout = props => {
  return (
    <Container>
      <RecipeProvider>
        <Header />
        <Main>
          {props.children}
        </Main>
      </RecipeProvider>
    </Container>
  );
}

export default Layout;