import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #BDFFF3, #4AC29A);
  position: relative;
  display: flex;
`;

const Ingredients = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: ${props => props.selected ? '0' : '-100%'};
  width: 90%;
  min-height: 100%;
  transition: left 0.2s ease-in;
  color: white;
`;

const Method = styled.div`
  position: absolute;
  right: ${props => props.selected ? '0' : '-100%'};
  /* transform: ${props => props.selected ? 'translateX(-100%)' : ''}; */
  width: 90%;
  transition: all 0.2s ease-in;
`;

const Tab = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${props => props.selected ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.3)'};
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${props => props.selected ? '0' : '90%'};
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
        <Text selected={selected}>{ selected ? 'Method' : 'Ingredients' }</Text>
      </Tab>
      <Method selected={!selected}>
        <h1>This is my method. Isn't it cool</h1>
      </Method>
    </Container>
  );
}

export default Design;