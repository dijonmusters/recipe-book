import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RecipeContext } from '../context/RecipeProvider';

const Container = styled.div`
  display: flex;
  margin: 0.125rem;
  overflow-x: hidden;
`;

const Content = styled.div`
  display: flex;
  overflow: scroll;
  scroll-snap-type: x mandatory;
`;

const Panel = styled.div`
  min-width: 100%;
  padding: 0 3rem;
  scroll-snap-align: center;
  background-color: white;
  padding-bottom: 1rem;
`;

const Title = styled.h1`
  font-family: 'Dancing Script', cursive;
  text-align: center;
  padding: 1rem 0;
  margin-bottom: 0;
  font-weight: 100;
  color: #777;
  font-size: 3rem;
  background-color: white;
`;

const Ingredient = styled.span`
  ${props => props.selected ? 'text-decoration: line-through' : ''};
  &:hover {
    cursor: pointer;
  }
  display: block;
  margin: 0.5rem 0;
`;

const Recipe = ({ method, ingredients, name }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { setSelectedRecipe } = useContext(RecipeContext);

  useEffect(() => {
    setSelectedRecipe(name);
  }, []);

  const handleSelectIngredient = ingredient => {
    setSelectedIngredients(
      selectedIngredients.includes(ingredient)
        ? selectedIngredients.filter(i => i !== ingredient)
        : [...selectedIngredients, ingredient]
    );
  }

  const renderIngredient = (ingredient) => (
    <Ingredient
      key={ingredient}
      selected={selectedIngredients.includes(ingredient)}
      onClick={() => handleSelectIngredient(ingredient)}
    >
      {ingredient}
    </Ingredient>
  );

  return (
    <Container>
      <Content>
        <Panel>
          <Title>
            ingredients
          </Title>
          {ingredients.map(renderIngredient)}
        </Panel>
        <Panel>
          <Title>
            method
          </Title>
          <div dangerouslySetInnerHTML={{ __html: method }} />
        </Panel>
      </Content>
    </Container>
  );
}

export default Recipe;