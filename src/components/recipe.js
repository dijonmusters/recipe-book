import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  overflow-x: hidden;
`;

const Ingredients = styled.div`
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.2);
  height: ${props => props.selected ? 'auto' : '0'};
  overflow-y: scroll;
  color: #444;
`;

const Method = styled.div`
  padding: 2rem;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: ${props => props.selected ? '90%' : '0'};
  transition: all 0.2s ease-in;
  color: #444;
`;

const Tab = styled.div`
  width: 10%;
  max-height: 100vh;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${props => props.selected ? '10%' : '0'};
  justify-content: center;
  align-items: center;
  color: #444;
  transition: all 0.2s ease-in;
  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.div`
  transform: ${props => props.selected ? 'rotate(-360deg)' : 'rotate(-90deg)'};
  font-size: 2rem;
  transition: all 0.2s;
`;

const Ingredient = styled.span`
  ${props => props.selected ? 'text-decoration: line-through' : ''};
  &:hover {
    cursor: pointer;
  }
`;

const Recipe = ({ method, ingredients }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selected, setSelected] = useState(true);
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
      <Ingredient selected={selectedIngredients.includes(ingredient)} onClick={() =>handleSelectIngredient(ingredient)}>
        {ingredient}
      </Ingredient>
    </p>
  );
  return (
    <Container>
      <Ingredients selected={selected}>
        {ingredients.map(renderIngredient)}
      </Ingredients>
      <Tab selected={selected} onClick={handleToggle}>
        <Text selected={selected}>{ selected ? '<' : 'Ingredients' }</Text>
      </Tab>
      <Method selected={!selected}>
        <div dangerouslySetInnerHTML={{ __html: method }} />
      </Method>
    </Container>
  );
}

export default Recipe;