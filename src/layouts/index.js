import React from 'react';
import styled from 'styled-components';
import '../styles/reset.css';
import RecipeProvider from '../context/RecipeProvider';
import Header from '../components/header';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #BDFFF3, #4AC29A);
  text-transform: lowercase;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
`;

const Layout = props => {
  return (
    <RecipeProvider>
      <Container>
        <Header />
        <Main>
          {props.children}
        </Main>
      </Container>
    </RecipeProvider>
  );
}

export default Layout;