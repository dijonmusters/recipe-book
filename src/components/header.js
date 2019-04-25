import { Link } from 'gatsby';
import React, { createRef, useContext } from 'react';
import styled from 'styled-components';
import { Location } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { RecipeContext } from '../context/RecipeProvider';
import { graphql, useStaticQuery } from 'gatsby';

const HeaderStyled = styled.header`
  background-color: white;
  padding: 2rem;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #4AC29A;
  &:visited {
    color: #4AC29A;
  }
`;

const Input = styled.input`
  color: #888;
  font-weight: normal;
  flex: 1;
  padding-left: 0.5rem;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Icon = styled.span`
  color: #4AC29A;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  margin: 0;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Name = styled.span`
  color: #888;
  font-weight: normal;
  flex: 1;
  padding-left: 0.5rem;
`;

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const filterRecipes = (recipes, value) => recipes.filter(recipe => {
  const { title, ingredients } = recipe;
  const ingredientExists = ingredients.some(ingredient => ingredient.toLowerCase().includes(value.toLowerCase()));
  return ingredientExists || title.toLowerCase().includes(value.toLowerCase());
});

const Header = () => {
  const { recipes, setFilteredRecipes, selectedRecipe } = useContext(RecipeContext);
  const inputRef = createRef();

  const focusInput = () => {
    inputRef.current.focus();
  }

  const data = useStaticQuery(query);
  const { site: { siteMetadata: { title }}} = data;

  return (
    <HeaderStyled>
      <Title>
        <LinkStyled to="/">
          {title} /
        </LinkStyled>
        <Location>
          {({ location }) => location.pathname === '/'
              ? (
                <>
                  <Input
                    autoFocus={true}
                    ref={inputRef}
                    onChange={e => setFilteredRecipes(filterRecipes(recipes, e.currentTarget.value))}
                  />
                  <Icon onClick={focusInput}><FontAwesomeIcon icon={faSearch}/></Icon>
                </>
              ) : <Name>{selectedRecipe}</Name>
          }
        </Location>
      </Title>
    </HeaderStyled>
  );
};

export default Header;
