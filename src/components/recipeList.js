import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { RecipeContext } from '../context/RecipeProvider';

const Card = styled.div`
  position: relative;
  background-color: white;
  padding: 2rem 2rem;
  @media only screen and (max-width: 768px) {
    margin: 0.125rem;
  }
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
`;

const LinkStyled = styled(Link)`
  &:visited, :link {
    color: #444;
    text-decoration: none;
  }
`;

const Label = styled.span`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  font-size: 0.75rem;
  background-color: #4AC29A;
  padding: 0 0.5rem;
  color: white;
`;

const RecipeGrid = styled.div`
  margin-top: 0.1rem;
  display: grid;
  grid-gap: 0.125rem;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const Error = styled.div`
  background-color: white;
  font-size: 2rem;
  padding: 2rem 0;
  width: 100%;
  text-align: center;
  margin-top: 0.125rem;
  color: #4AC29A;
`;

const renderRecipes = (recipe, i) => {
  const { title, path, time } = recipe;
  return (
    <LinkStyled
      to={path}
      key={i}
      state={{name: title}}
    >
      <Card>
        {title}
        <Label>{time}</Label>
      </Card>
    </LinkStyled>
  )
};

const RecipeList = props => {
  const { filteredRecipes, setSelectedRecipe } = useContext(RecipeContext);
  setSelectedRecipe(null);
  return filteredRecipes.length > 0
    ? (
      <RecipeGrid>
        {filteredRecipes.map(renderRecipes)}
      </RecipeGrid>
    ) : <Error>No recipes found</Error>
}

export default RecipeList;