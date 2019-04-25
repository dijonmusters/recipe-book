import React from 'react';
import styled from 'styled-components';
import SEO from '../components/seo';
import RecipeList from '../components/recipeList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const IndexPage = () => {
  return (
    <Container>
      <SEO title="Recipes" keywords={[`recipe`, `list`, `all`]} />
      <RecipeList />
    </Container>
  );
}

export default IndexPage;
