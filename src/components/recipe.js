import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { RecipeContext } from '../context/RecipeProvider';

const Container = styled.div`
  position relative;
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

const Page = styled.div`
  display: flex;
  justify-content: center;
  min-width: 90vw;
  scroll-snap-align: center;
`;

const Panel = styled.div`
  background-color: white;
  margin: 2rem 1rem;
  padding: 2rem 6rem;
  width: 100%;
  ${props => props.first && 'margin-left: 2rem'};
  ${props => props.last && 'margin-right: 2rem'};
`

const Title = styled.h1`
  font-family: 'Dancing Script', cursive;
  text-align: center;
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
  color: #555;
`;

const Switcher = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`

const Dot = styled.div`
  background-color: ${props => props.selected ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)'};
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 0 0.125rem;
`

const Recipe = ({ method, ingredients, name }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const { setSelectedRecipe } = useContext(RecipeContext);
  const [selected, setSelected] = useState(true);
  const panelRef = useRef();

  useEffect(() => {
    setSelectedRecipe(name);
  }, []);

  useEffect(() => {
    const config = {
      threshold: [0.25, 0.75]
    };

    const observer = new IntersectionObserver((entry, observer) => {
      setSelected(entry[0].isIntersecting)
    }, config);
    if (panelRef && panelRef.current) {
      observer.observe(panelRef.current)
    }
  }, [])

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
        <Page>
          <Panel ref={panelRef} first>
            <Title>
              ingredients
            </Title>
            {ingredients.map(renderIngredient)}
          </Panel>
        </Page>
        <Page>
          <Panel last>
            <Title>
              method
            </Title>
            {method.map(renderStep)}
          </Panel>
        </Page>
      </Content>
      <Switcher><Dot selected={selected} /><Dot selected={!selected} /></Switcher>
    </Container>
  );
}

export default Recipe;