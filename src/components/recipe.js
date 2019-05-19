import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RecipeContext } from '../context/RecipeProvider';

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${props => props.selected ? 'flex-start' : 'flex-end'};
  overflow-x: hidden;
  color: #444;
`;

const Content = styled.div`
  background-color: white;
  height: 100%;
  padding: 2rem;
`;

const Ingredients = styled.div`
  padding: 2rem;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: ${props => props.selected ? '90%' : '0'};
  background-color: rgba(255, 255, 255, 0.2);
  height: ${props => props.selected ? 'auto' : '0'};
  overflow-y: scroll;
`;

const Method = styled.div`
  padding: 2rem;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: ${props => props.selected ? '90%' : '0'};
  height: ${props => props.selected ? 'auto' : '0'};
  transition: all 0.2s ease-in;
  overflow-y: scroll;
`;

const Tab = styled.div`
  width: 10%;
  max-height: 100vh;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${props => props.selected ? '10%' : '0'};
  background-color: ${props => props.selected ? '' : 'rgba(255, 255, 255, 0.4)'};
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in;
  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.div`
  transform: ${props => props.selected ? 'rotate(90deg)' : 'rotate(-90deg)'};
  font-size: 2rem;
  transition: all 0.2s;
`;

const Ingredient = styled.span`
  ${props => props.selected ? 'text-decoration: line-through' : ''};
  &:hover {
    cursor: pointer;
  }
`;

const Chevron = styled.span`
  margin: 10px;
  color: rgba(0, 0, 0, 0.2);
  transform: translateY(200px);
`;

const Recipe = ({ method, ingredients, name }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selected, setSelected] = useState(true);
  const { setSelectedRecipe } = useContext(RecipeContext);
  useEffect(() => {
    setSelectedRecipe(name);
  }, []);
  const handleToggle = () => {
    setSelected(!selected);
  };
  const handleSelectIngredient = ingredient => {
    setSelectedIngredients(
      selectedIngredients.includes(ingredient)
        ? selectedIngredients.filter(i => i !== ingredient)
        : [...selectedIngredients, ingredient]
    );
  }
  const renderIngredient = (ingredient) => (
    <p key={ingredient}>
      <Ingredient selected={selectedIngredients.includes(ingredient)} onClick={() => handleSelectIngredient(ingredient)}>
        {ingredient}
      </Ingredient>
    </p>
  );
  return (
    <Container selected={selected}>
      <Ingredients selected={selected}>
        <Content>
          {ingredients.map(renderIngredient)}
        </Content>
      </Ingredients>
      <Tab selected={selected} onClick={handleToggle}>
      <Text selected={selected}>
        <Chevron>&#9660;</Chevron>
        { selected ? 'Method' : 'Ingredients' }
        <Chevron>&#9660;</Chevron>
      </Text>
      </Tab>
      <Method selected={!selected}>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: method }} />
        </Content>
      </Method>
    </Container>
  );
}

export default Recipe;