import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #BDFFF3, #4AC29A);
  display: flex;
  justify-content: flex-end;
`;

const Ingredients = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.2s linear;
  color: white;
`;

const Method = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: ${props => props.selected ? '90%' : '0'};
  transition: all 0.2s linear;
`;

const Tab = styled.div`
  width: 10%;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${props => props.selected ? '10%' : '0'};
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${props => props.selected ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.3)'};
  transition: all 0.2s linear;
  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.div`
  transform: ${props => props.selected ? 'rotate(-360deg)' : 'rotate(-90deg)'};
  font-size: 2rem;
  transition: all 0.2s linear;
`;


const Design = props => {
  const [selected, setSelected] = useState(true);
  const handleToggle = () => {
    setSelected(!selected);
  };
  return (
    <Container>
      <Ingredients selected={selected}>
        <h1>These are my ingredients</h1>
        <p>dgsggsgdgsdg</p>
      </Ingredients>
      <Tab selected={selected} onClick={handleToggle}>
        <Text selected={selected}>{ selected ? '<' : 'Ingredients' }</Text>
      </Tab>
      <Method selected={!selected}>
        <h1>This is my method. Isn't it cool</h1>
      </Method>
    </Container>
  );
}

export default Design;