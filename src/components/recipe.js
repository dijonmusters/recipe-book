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
  -webkit-overflow-scrolling: touch;
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
  color: #999;
  font-size: 3rem;
  background-color: white;
`;

const Step = styled.p`
  display: flex;
  margin: 0;
  line-height: 1;
`;

const Number = styled.span`
  color: #ddd;
  font-size: 2rem;
  width: 2rem;
`;

const Item = styled.span`
  ${props => props.selected ? 'text-decoration: line-through' : ''};
  &:hover {
    cursor: pointer;
  }
  display: block;
  margin: 0.5rem 0;
  flex: 1;
`;

const Recipe = ({ method, ingredients, name }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedSteps, setSelectedSteps] = useState([]);
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

  const handleSelectStep = step => {
    setSelectedSteps(
      selectedSteps.includes(step)
        ? selectedSteps.filter(s => s !== step)
        : [...selectedSteps, step]
    );
  }

  const renderIngredient = ingredient => (
    <Item
      key={ingredient}
      selected={selectedIngredients.includes(ingredient)}
      onClick={() => handleSelectIngredient(ingredient)}
    >
      {ingredient}
    </Item>
  );

  const renderStep = (step, i) => (
    <Step>
      <Number>{i + 1}</Number>
      <Item
        key={step}
        selected={selectedSteps.includes(step)}
        onClick={() => handleSelectStep(step)}
      >
        {step}
      </Item>
    </Step>
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
          {method.map(renderStep)}
        </Panel>
      </Content>
    </Container>
  );
}

export default Recipe;